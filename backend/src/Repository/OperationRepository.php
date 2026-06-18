<?php
// src/Repository/OperationRepository.php
namespace App\Repository;

use App\Entity\Operation;
use App\Enum\CategoryEnum;
use App\Enum\OperationTypeEnum;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class OperationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Operation::class);
    }

    /** Toutes les opérations triées par date desc */
    public function findAllOrderedByDate(): array
    {
        return $this->createQueryBuilder('o')
            ->orderBy('o.date', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /** Filtrer par type (expense | income) */
    public function findByType(OperationTypeEnum $type): array
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.type = :type')
            ->setParameter('type', $type)
            ->orderBy('o.date', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /** Filtrer par catégorie */
    public function findByCategory(CategoryEnum $category): array
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.category = :cat')
            ->setParameter('cat', $category)
            ->orderBy('o.date', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /** Total des dépenses */
    public function getTotalExpenses(): float
    {
        return (float) $this->createQueryBuilder('o')
            ->select('SUM(o.amount)')
            ->andWhere('o.type = :type')
            ->setParameter('type', OperationTypeEnum::EXPENSE)
            ->getQuery()
            ->getSingleScalarResult() ?? 0;
    }

    /** Total des revenus */
    public function getTotalIncome(): float
    {
        return (float) $this->createQueryBuilder('o')
            ->select('SUM(o.amount)')
            ->andWhere('o.type = :type')
            ->setParameter('type', OperationTypeEnum::INCOME)
            ->getQuery()
            ->getSingleScalarResult() ?? 0;
    }
}