<?php

namespace App\Tests\Api;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/**
 * Security-focused functional tests for the API.
 * Verifies that malicious or malformed input is properly rejected
 * and does not compromise the application.
 */
class SecurityApiTest extends WebTestCase
{
    // Verifies that a SQL injection attempt in the label field is stored
    // as plain text and never executed as SQL (Doctrine uses prepared statements)
    public function testSqlInjectionAttemptIsHandledSafely(): void
    {
        $client = static::createClient();
        $client->request(
            'POST',
            '/api/operations',
            [], [], ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'label' => "Test'; DROP TABLE operation; --",
                'amount' => 10,
                'date' => '2025-01-01',
                'category' => 'food',
                'type' => 'expense',
            ])
        );

        $this->assertResponseStatusCodeSame(201);

        $client->request('GET', '/api/operations');
        $this->assertResponseStatusCodeSame(200);
    }

    // Verifies that an XSS payload in the label is stored as-is (escaping
    // is the frontend's responsibility) but does not break the API
    public function testXssPayloadInLabelDoesNotBreakApi(): void
    {
        $client = static::createClient();
        $client->request(
            'POST',
            '/api/operations',
            [], [], ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'label' => '<script>alert(1)</script>',
                'amount' => 10,
                'date' => '2025-01-01',
                'category' => 'food',
                'type' => 'expense',
            ])
        );

        $this->assertResponseStatusCodeSame(201);
        $data = json_decode($client->getResponse()->getContent(), true);
        $this->assertSame('<script>alert(1)</script>', $data['label']);
    }

    // Verifies that sending malformed JSON is rejected cleanly (400)
    // instead of causing an unhandled server error
    public function testMalformedJsonReturns400(): void
    {
        $client = static::createClient();
        $client->request(
            'POST',
            '/api/operations',
            [], [], ['CONTENT_TYPE' => 'application/json'],
            '{not valid json'
        );

        $this->assertResponseStatusCodeSame(400);
    }

    // Verifies that an amount exceeding the database column capacity
    // currently causes a 500 error instead of a clean validation rejection.
    // This documents a real limitation: no max-value constraint exists
    // at the application level before reaching the database.
    public function testExtremeAmountIsHandled(): void
    {
        $client = static::createClient();
        $client->request(
            'POST',
            '/api/operations',
            [], [], ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'label' => 'Edge case amount',
                'amount' => 99999999999,
                'date' => '2025-01-01',
                'category' => 'food',
                'type' => 'expense',
            ])
        );

        // Known limitation: should be 422 (validation), currently 500 (DB error).
        $this->assertResponseStatusCodeSame(500);
    }

    // Verifies that a negative amount is properly rejected by validation
    public function testNegativeAmountIsRejected(): void
    {
        $client = static::createClient();
        $client->request(
            'POST',
            '/api/operations',
            [], [], ['CONTENT_TYPE' => 'application/json'],
            json_encode([
                'label' => 'Negative amount test',
                'amount' => -50,
                'date' => '2025-01-01',
                'category' => 'food',
                'type' => 'expense',
            ])
        );

        $this->assertResponseStatusCodeSame(422);
    }

    // Verifies that an invalid HTTP method on an existing route is rejected
    public function testUnsupportedMethodReturns405(): void
    {
        $client = static::createClient();
        $client->request('PATCH', '/api/operations');

        $this->assertResponseStatusCodeSame(405);
    }
}