<?php
// src/Controller/OperationController.php
namespace App\Controller;

use App\Entity\Operation;
use App\Enum\CategoryEnum;
use App\Enum\OperationTypeEnum;
use App\Repository\OperationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/operations', name: 'api_operations_')]
class OperationController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $em,
        private OperationRepository    $repo,
        private ValidatorInterface     $validator,
    ) {}

    /** GET /api/operations */
    #[Route('', name: 'index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $operations = $this->repo->findAllOrderedByDate();
        return $this->json($this->serialize($operations));
    }

    /** POST /api/operations */
    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['error' => 'Invalid JSON'], 400);
        }

        $op = new Operation();
        $op->setLabel($data['label'] ?? '');
        $op->setAmount((float)($data['amount'] ?? 0));
        $op->setDate(new \DateTime($data['date'] ?? 'now'));
        $op->setCategory(CategoryEnum::from($data['category'] ?? 'food'));
        $op->setType(OperationTypeEnum::from($data['type'] ?? 'expense'));

        $errors = $this->validator->validate($op);
        if (count($errors) > 0) {
            $messages = [];
            foreach ($errors as $e) {
                $messages[$e->getPropertyPath()] = $e->getMessage();
            }
            return $this->json(['errors' => $messages], 422);
        }

        $this->em->persist($op);
        $this->em->flush();

        return $this->json($this->serializeOne($op), 201);
    }

    /** GET /api/operations/summary — must come BEFORE /{id} to avoid route collision */
    #[Route('/summary', name: 'summary', methods: ['GET'])]
    public function summary(): JsonResponse
    {
        $income   = $this->repo->getTotalIncome();
        $expenses = $this->repo->getTotalExpenses();
        return $this->json([
            'income'   => $income,
            'expenses' => $expenses,
            'balance'  => $income - $expenses,
        ]);
    }

    /** GET /api/operations/{id} */
    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(Operation $op): JsonResponse
    {
        return $this->json($this->serializeOne($op));
    }

    /** PUT /api/operations/{id} */
    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Operation $op, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['label']))    $op->setLabel($data['label']);
        if (isset($data['amount']))   $op->setAmount((float)$data['amount']);
        if (isset($data['date']))     $op->setDate(new \DateTime($data['date']));
        if (isset($data['category'])) $op->setCategory(CategoryEnum::from($data['category']));
        if (isset($data['type']))     $op->setType(OperationTypeEnum::from($data['type']));

        $errors = $this->validator->validate($op);
        if (count($errors) > 0) {
            return $this->json(['errors' => (string)$errors], 422);
        }

        $this->em->flush();
        return $this->json($this->serializeOne($op));
    }

    /** DELETE /api/operations/{id} */
    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Operation $op): JsonResponse
    {
        $this->em->remove($op);
        $this->em->flush();
        return $this->json(null, 204);
    }

    // ── Serialization helpers ─────────────────────────────────────
    private function serializeOne(Operation $op): array
    {
        return [
            'id'        => $op->getId(),
            'label'     => $op->getLabel(),
            'amount'    => $op->getAmount(),
            'date'      => $op->getDate()->format('Y-m-d'),
            'category'  => $op->getCategory()->value,
            'type'      => $op->getType()->value,
            'createdAt' => $op->getCreatedAt()->format(\DateTimeInterface::ATOM),
        ];
    }

    private function serialize(array $ops): array
    {
        return array_map(fn($op) => $this->serializeOne($op), $ops);
    }
}