<?php

namespace Tests\Unit\Backend\Services;

use Tests\Unit\Backend\TestCase;
use Tests\Unit\Backend\Helpers\TestHelper;

/**
 * Example test case to demonstrate PHPUnit setup and testing utilities
 */
class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicExample()
    {
        $this->assertTrue(true);
    }

    /**
     * Test faker data generation
     *
     * @return void
     */
    public function testFakerDataGeneration()
    {
        $userData = TestHelper::generateUserData();
        
        $this->assertIsArray($userData);
        $this->assertArrayHasKey('username', $userData);
        $this->assertArrayHasKey('email', $userData);
        $this->assertArrayHasKey('password_hash', $userData);
        $this->assertArrayHasKey('role', $userData);
    }

    /**
     * Test array structure assertion
     *
     * @return void
     */
    public function testArrayStructureAssertion()
    {
        $testArray = [
            'id' => 1,
            'name' => 'Test',
            'email' => 'test@example.com'
        ];

        $expectedKeys = ['id', 'name', 'email'];
        
        // Verificar que todas las claves esperadas existen
        foreach ($expectedKeys as $key) {
            $this->assertArrayHasKey($key, $testArray, "La clave '$key' no existe en el array");
        }
        
        // Verificar los valores
        $this->assertEquals(1, $testArray['id']);
        $this->assertEquals('Test', $testArray['name']);
        $this->assertEquals('test@example.com', $testArray['email']);
    }

    /**
     * Test mock request creation
     *
     * @return void
     */
    public function testMockRequestCreation()
    {
        $request = TestHelper::createMockRequest('POST', '/api/users', ['name' => 'Test User']);
        
        $this->assertEquals('POST', $request['method']);
        $this->assertEquals('/api/users', $request['uri']);
        $this->assertArrayHasKey('name', $request['data']);
        $this->assertEquals('Test User', $request['data']['name']);
    }

    /**
     * Test mock response creation
     *
     * @return void
     */
    public function testMockResponseCreation()
    {
        $response = TestHelper::createMockResponse(201, ['id' => 1, 'message' => 'Created']);
        
        $this->assertEquals(201, $response['status_code']);
        $this->assertArrayHasKey('id', $response['data']);
        $this->assertEquals('Created', $response['data']['message']);
    }

    /**
     * Test slugify utility
     *
     * @return void
     */
    public function testSlugifyUtility()
    {
        $title = 'This is a Test Title!';
        $slug = TestHelper::slugify($title);
        
        $this->assertEquals('this-is-a-test-title', $slug);
    }
}