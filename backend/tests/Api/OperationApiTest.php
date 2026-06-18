<?php

namespace App\Tests\Api;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/**
 * Functional tests for the Operation API endpoints (/api/operations).
 * These tests cover the main use cases: listing, creating, reading,
 * updating, deleting operations, and the summary endpoint.
 */
class OperationApiTest extends WebTestCase
{
    // ── TEST 1 : GET /api/operations ──────────────────────────────
    public function testGetOperationsReturns200(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/operations');

        $this->assertResponseStatusCodeSame(200);
        $data = json_decode($client->getResponse()->getContent(), true);
        $this->assertIsArray($data);
    }

    // ── TEST 2 : POST /api/operations - nominal case ────────────────
    public function testPostOperationCreatesOperation(): void
    {
        $client = static::createClient();
        $client->request(
            'POST',
            '/api/operations',
            [], [], ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'label' => 'Supermarket Carrefour',
                'amount' => 45.90,
                'date' => '2025-01-10',
                'category' => 'food',
                'type' => 'expense',
            ])
        );

        $this->assertResponseStatusCodeSame(201);
        $data = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('id', $data);
        $this->assertEquals('Supermarket Carrefour', $data['label']);
        $this->assertEquals(45.90, $data['amount']);
        $this->assertEquals('food', $data['category']);
        $this->assertEquals('expense', $data['type']);


    }

    // ── TEST 3 : POST with invalid category - error case ────────────
    public function testPostOperationWithInvalidCategoryReturns500(): void
    {
        $client = static::createClient();
        $client->request(
            'POST',
            '/api/operations',
            [], [], ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'label' => 'Test',
                'amount' => 10,
                'date' => '2025-01-01',
                'category' => 'invalid_category',
                'type' => 'expense',
            ])
        );

        // CategoryEnum::from() throws a ValueError for an invalid value,
        // resulting in an unhandled exception (500) since there's no try/catch
        $this->assertResponseStatusCodeSame(500);
    }

    // ── TEST 4 : GET non-existent operation - 404 ────────────────────
    public function testGetNonExistentOperationReturns404(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/operations/99999');

        $this->assertResponseStatusCodeSame(404);
    }

    // ── TEST 5 : Full lifecycle - create, update, delete ─────────────
    public function testUpdateAndDeleteOperation(): void
    {
        $client = static::createClient();

        // Create an operation first
        $client->request(
            'POST',
            '/api/operations',
            [], [], ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'label' => 'To be updated',
                'amount' => 20,
                'date' => '2025-01-01',
                'category' => 'bills',
                'type' => 'expense',
            ])
        );
        $created = json_decode($client->getResponse()->getContent(), true);
        $id = $created['id'];

        // Update the label and amount
        $client->request(
            'PUT',
            "/api/operations/{$id}",
            [], [], ['CONTENT_TYPE' => 'application/json'],
            json_encode(['label' => 'Updated label', 'amount' => 99.99])
        );
        $this->assertResponseStatusCodeSame(200);
        $updated = json_decode($client->getResponse()->getContent(), true);
        $this->assertEquals('Updated label', $updated['label']);
        $this->assertEquals(99.99, $updated['amount']);

        // Delete the operation
        $client->request('DELETE', "/api/operations/{$id}");
        $this->assertResponseStatusCodeSame(204);

        // Verify it no longer exists
        $client->request('GET', "/api/operations/{$id}");
        $this->assertResponseStatusCodeSame(404);
    }

    // ── TEST 6 : GET /api/operations/summary ──────────────────────────
    public function testGetSummaryReturnsIncomeExpensesAndBalance(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/operations/summary');

        $this->assertResponseStatusCodeSame(200);
        $data = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('income', $data);
        $this->assertArrayHasKey('expenses', $data);
        $this->assertArrayHasKey('balance', $data);
        $this->assertEquals($data['income'] - $data['expenses'], $data['balance']);
    }
}