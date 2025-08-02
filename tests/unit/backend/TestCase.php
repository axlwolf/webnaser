<?php

namespace Tests\Unit\Backend;

use PHPUnit\Framework\TestCase as BaseTestCase;
use Mockery;
use Tests\Unit\Backend\Fixtures\DatabaseFixture;
use Tests\Unit\Backend\Helpers\TestHelper;
use PDO;

/**
 * Base TestCase for all unit tests
 */
abstract class TestCase extends BaseTestCase
{
    protected ?PDO $db = null;

    /**
     * Set up the test case
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();
        
        // Initialize database connection for tests that need it
        if ($this->needsDatabase()) {
            $this->db = DatabaseFixture::getConnection();
            DatabaseFixture::reset();
            
            if ($this->needsSeededData()) {
                DatabaseFixture::seed();
            }
        }
    }

    /**
     * Tear down the test case
     *
     * @return void
     */
    protected function tearDown(): void
    {
        if ($this->db !== null) {
            DatabaseFixture::reset();
            $this->db = null;
        }
        
        Mockery::close();
        parent::tearDown();
    }

    /**
     * Determine if this test needs database access
     * Override in child classes that need database
     *
     * @return bool
     */
    protected function needsDatabase(): bool
    {
        return false;
    }

    /**
     * Determine if this test needs seeded data
     * Override in child classes that need seeded data
     *
     * @return bool
     */
    protected function needsSeededData(): bool
    {
        return false;
    }

    /**
     * Get test helper instance
     *
     * @return TestHelper
     */
    protected function helper(): TestHelper
    {
        return new TestHelper();
    }

    /**
     * Assert that response has expected JSON structure
     *
     * @param array $expectedKeys
     * @param array $response
     * @param string $message
     * @return void
     */
    protected function assertJsonStructure(array $expectedKeys, array $response, string $message = ''): void
    {
        TestHelper::assertArrayStructure($expectedKeys, $response, $message);
    }

    /**
     * Create a mock object with fluent interface
     *
     * @param string $className
     * @return \Mockery\MockInterface
     */
    protected function mock(string $className): \Mockery\MockInterface
    {
        return Mockery::mock($className);
    }

    /**
     * Create a partial mock object
     *
     * @param string $className
     * @param array $args
     * @return \Mockery\MockInterface
     */
    protected function partialMock(string $className, array $args = []): \Mockery\MockInterface
    {
        return Mockery::mock($className, $args)->makePartial();
    }

    /**
     * Create a spy object
     *
     * @param string $className
     * @return \Mockery\MockInterface
     */
    protected function spy(string $className): \Mockery\MockInterface
    {
        return Mockery::spy($className);
    }
}