<?php

namespace Tests\Unit\Backend\Models;

use PHPUnit\Framework\TestCase;
use Tests\Unit\Backend\Fixtures\DatabaseFixture;
use Tests\Unit\Backend\Helpers\TestHelper;

/**
 * User model test example
 */
class UserTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        DatabaseFixture::reset();
    }

    public function testCanCreateUserData(): void
    {
        $userData = TestHelper::generateUserData([
            'username' => 'testuser',
            'email' => 'test@naser.com.mx'
        ]);

        $this->assertEquals('testuser', $userData['username']);
        $this->assertEquals('test@naser.com.mx', $userData['email']);
        $this->assertArrayHasKey('password_hash', $userData);
        $this->assertArrayHasKey('role', $userData);
    }

    public function testCanSeedDatabase(): void
    {
        DatabaseFixture::seed();
        $connection = DatabaseFixture::getConnection();

        $stmt = $connection->query('SELECT COUNT(*) as count FROM users');
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);

        $this->assertGreaterThan(0, $result['count']);
    }

    public function testDatabaseStructure(): void
    {
        $connection = DatabaseFixture::getConnection();
        
        // Test that users table exists and has expected columns
        $stmt = $connection->query("PRAGMA table_info(users)");
        $columns = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        
        $columnNames = array_column($columns, 'name');
        
        $expectedColumns = ['id', 'username', 'email', 'password_hash', 'role', 'created_at', 'updated_at'];
        
        foreach ($expectedColumns as $column) {
            $this->assertContains($column, $columnNames, "Column {$column} should exist in users table");
        }
    }
}