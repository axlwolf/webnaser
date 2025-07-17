<?php

namespace Tests\Unit\Backend\Models;

use Tests\Unit\Backend\TestCase;
use Tests\Unit\Backend\Helpers\TestHelper;

/**
 * Example database test to demonstrate database fixtures
 */
class DatabaseTest extends TestCase
{
    /**
     * This test needs database access
     *
     * @return bool
     */
    protected function needsDatabase(): bool
    {
        return true;
    }

    /**
     * This test needs seeded data
     *
     * @return bool
     */
    protected function needsSeededData(): bool
    {
        return true;
    }

    /**
     * Test database connection
     *
     * @return void
     */
    public function testDatabaseConnection()
    {
        $this->assertNotNull($this->db);
        $this->assertInstanceOf(\PDO::class, $this->db);
    }

    /**
     * Test seeded users exist
     *
     * @return void
     */
    public function testSeededUsersExist()
    {
        $stmt = $this->db->query("SELECT COUNT(*) as count FROM users");
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);
        
        $this->assertGreaterThan(0, $result['count']);
    }

    /**
     * Test user data structure
     *
     * @return void
     */
    public function testUserDataStructure()
    {
        $stmt = $this->db->query("SELECT * FROM users LIMIT 1");
        $user = $stmt->fetch(\PDO::FETCH_ASSOC);
        
        $expectedKeys = ['id', 'username', 'email', 'password_hash', 'role', 'created_at', 'updated_at'];
        $this->assertJsonStructure($expectedKeys, $user);
    }

    /**
     * Test inserting new user with generated data
     *
     * @return void
     */
    public function testInsertUserWithGeneratedData()
    {
        $userData = TestHelper::generateUserData([
            'username' => 'testuser',
            'email' => 'test@example.com'
        ]);

        $stmt = $this->db->prepare("
            INSERT INTO users (username, email, password_hash, role, created_at, updated_at) 
            VALUES (:username, :email, :password_hash, :role, :created_at, :updated_at)
        ");

        $result = $stmt->execute([
            'username' => $userData['username'],
            'email' => $userData['email'],
            'password_hash' => $userData['password_hash'],
            'role' => $userData['role'],
            'created_at' => $userData['created_at'],
            'updated_at' => $userData['updated_at']
        ]);

        $this->assertTrue($result);

        // Verify the user was inserted
        $stmt = $this->db->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->execute(['username' => 'testuser']);
        $insertedUser = $stmt->fetch(\PDO::FETCH_ASSOC);

        $this->assertNotFalse($insertedUser);
        $this->assertEquals('testuser', $insertedUser['username']);
        $this->assertEquals('test@example.com', $insertedUser['email']);
    }

    /**
     * Test page data generation and insertion
     *
     * @return void
     */
    public function testPageDataGeneration()
    {
        $pageData = TestHelper::generatePageData([
            'title' => 'Test Page',
            'status' => 'published'
        ]);

        $stmt = $this->db->prepare("
            INSERT INTO pages (title, slug, content, meta_title, meta_description, status, created_at, updated_at) 
            VALUES (:title, :slug, :content, :meta_title, :meta_description, :status, :created_at, :updated_at)
        ");

        $result = $stmt->execute($pageData);
        $this->assertTrue($result);

        // Verify the page was inserted
        $stmt = $this->db->prepare("SELECT * FROM pages WHERE title = :title");
        $stmt->execute(['title' => 'Test Page']);
        $insertedPage = $stmt->fetch(\PDO::FETCH_ASSOC);

        $this->assertNotFalse($insertedPage);
        $this->assertEquals('Test Page', $insertedPage['title']);
        $this->assertEquals('published', $insertedPage['status']);
    }

    /**
     * Test service data generation
     *
     * @return void
     */
    public function testServiceDataGeneration()
    {
        $serviceData = TestHelper::generateServiceData([
            'name' => 'Test Service',
            'price' => 15000.00
        ]);

        $this->assertEquals('Test Service', $serviceData['name']);
        $this->assertEquals(15000.00, $serviceData['price']);
        $this->assertArrayHasKey('description', $serviceData);
        $this->assertArrayHasKey('status', $serviceData);
    }

    /**
     * Test location data generation
     *
     * @return void
     */
    public function testLocationDataGeneration()
    {
        $locationData = TestHelper::generateLocationData([
            'name' => 'Test Location'
        ]);

        $this->assertEquals('Test Location', $locationData['name']);
        $this->assertArrayHasKey('address', $locationData);
        $this->assertArrayHasKey('phone', $locationData);
        $this->assertArrayHasKey('latitude', $locationData);
        $this->assertArrayHasKey('longitude', $locationData);
    }

    /**
     * Test media data generation
     *
     * @return void
     */
    public function testMediaDataGeneration()
    {
        $mediaData = TestHelper::generateMediaData([
            'alt_text' => 'Test Image'
        ]);

        $this->assertEquals('Test Image', $mediaData['alt_text']);
        $this->assertArrayHasKey('filename', $mediaData);
        $this->assertArrayHasKey('mime_type', $mediaData);
        $this->assertArrayHasKey('size', $mediaData);
        $this->assertEquals('image/jpeg', $mediaData['mime_type']);
    }
}