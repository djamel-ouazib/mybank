<?php

namespace App\Controller;

use App\Entity\Expense;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/expenses')]
class ExpenseController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $expenses = $em->getRepository(Expense::class)->findAll();
        $data = array_map(fn($e) => [
            'id'       => $e->getId(),
            'label'    => $e->getLabel(),
            'amount'   => $e->getAmount(),
            'date'     => $e->getDate()->format('Y-m-d'),
            'category' => $e->getCategory(),
        ], $expenses);

        return $this->json($data);
    }

    #[Route('', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $body = json_decode($request->getContent(), true);

        if (empty($body['label'])) {
            return $this->json(['error' => 'label is required'], 422);
        }

        $expense = new Expense();
        $expense->setLabel($body['label']);
        $expense->setAmount($body['amount']);
        $expense->setDate(new \DateTime($body['date']));
        $expense->setCategory($body['category'] ?? null);

        $em->persist($expense);
        $em->flush();

        return $this->json([
            'id'       => $expense->getId(),
            'label'    => $expense->getLabel(),
            'amount'   => $expense->getAmount(),
            'date'     => $expense->getDate()->format('Y-m-d'),
            'category' => $expense->getCategory(),
        ], 201);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(int $id, EntityManagerInterface $em): JsonResponse
    {
        $expense = $em->getRepository(Expense::class)->find($id);
        if (!$expense) {
            return $this->json(['error' => 'Not found'], 404);
        }

        return $this->json([
            'id'       => $expense->getId(),
            'label'    => $expense->getLabel(),
            'amount'   => $expense->getAmount(),
            'date'     => $expense->getDate()->format('Y-m-d'),
            'category' => $expense->getCategory(),
        ]);
    }
}