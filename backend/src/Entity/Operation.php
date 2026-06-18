<?php
// src/Entity/Operation.php
namespace App\Entity;

use App\Enum\CategoryEnum;
use App\Enum\OperationTypeEnum;
use App\Repository\OperationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: OperationRepository::class)]
#[ORM\Table(name: 'operation')]
class Operation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    private string $label;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2)]
    #[Assert\NotBlank]
    #[Assert\Positive]
    private float $amount;

    #[ORM\Column(type: 'date')]
    #[Assert\NotNull]
    private \DateTimeInterface $date;

    #[ORM\Column(enumType: CategoryEnum::class)]
    #[Assert\NotNull]
    private CategoryEnum $category;

    #[ORM\Column(enumType: OperationTypeEnum::class)]
    #[Assert\NotNull]
    private OperationTypeEnum $type;

    #[ORM\Column]
    private \DateTimeImmutable $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    // Getters / Setters
    public function getId(): ?int { return $this->id; }

    public function getLabel(): string { return $this->label; }
    public function setLabel(string $label): static { $this->label = $label; return $this; }

    public function getAmount(): float { return $this->amount; }
    public function setAmount(float $amount): static { $this->amount = $amount; return $this; }

    public function getDate(): \DateTimeInterface { return $this->date; }
    public function setDate(\DateTimeInterface $date): static { $this->date = $date; return $this; }

    public function getCategory(): CategoryEnum { return $this->category; }
    public function setCategory(CategoryEnum $category): static { $this->category = $category; return $this; }

    public function getType(): OperationTypeEnum { return $this->type; }
    public function setType(OperationTypeEnum $type): static { $this->type = $type; return $this; }

    public function getCreatedAt(): \DateTimeImmutable { return $this->createdAt; }
}