<?php

namespace Tests\Unit\Backend\Helpers;

use Faker\Factory;
use Faker\Generator;

/**
 * Test helper utilities
 */
class TestHelper
{
    private static ?Generator $faker = null;

    /**
     * Get Faker instance
     *
     * @return Generator
     */
    public static function faker(): Generator
    {
        if (self::$faker === null) {
            self::$faker = Factory::create('es_ES'); // Spanish locale for Mexican content
        }

        return self::$faker;
    }

    /**
     * Generate test user data
     *
     * @param array $overrides
     * @return array
     */
    public static function generateUserData(array $overrides = []): array
    {
        $faker = self::faker();
        
        return array_merge([
            'username' => $faker->userName,
            'email' => $faker->email,
            'password_hash' => password_hash('password123', PASSWORD_DEFAULT),
            'role' => $faker->randomElement(['admin', 'editor']),
            'created_at' => $faker->dateTimeThisYear->format('Y-m-d H:i:s'),
            'updated_at' => $faker->dateTimeThisYear->format('Y-m-d H:i:s')
        ], $overrides);
    }

    /**
     * Generate test page data
     *
     * @param array $overrides
     * @return array
     */
    public static function generatePageData(array $overrides = []): array
    {
        $faker = self::faker();
        $title = $faker->sentence(3);
        
        return array_merge([
            'title' => $title,
            'slug' => self::slugify($title),
            'content' => $faker->paragraphs(3, true),
            'meta_title' => $title . ' - Grupo Naser',
            'meta_description' => $faker->sentence(10),
            'status' => $faker->randomElement(['draft', 'published']),
            'created_at' => $faker->dateTimeThisYear->format('Y-m-d H:i:s'),
            'updated_at' => $faker->dateTimeThisYear->format('Y-m-d H:i:s')
        ], $overrides);
    }

    /**
     * Generate test service data
     *
     * @param array $overrides
     * @return array
     */
    public static function generateServiceData(array $overrides = []): array
    {
        $faker = self::faker();
        
        return array_merge([
            'name' => $faker->words(3, true),
            'description' => $faker->paragraph,
            'image_url' => $faker->imageUrl(640, 480, 'business'),
            'price' => $faker->randomFloat(2, 5000, 50000),
            'status' => $faker->randomElement(['active', 'inactive']),
            'created_at' => $faker->dateTimeThisYear->format('Y-m-d H:i:s'),
            'updated_at' => $faker->dateTimeThisYear->format('Y-m-d H:i:s')
        ], $overrides);
    }

    /**
     * Generate test location data
     *
     * @param array $overrides
     * @return array
     */
    public static function generateLocationData(array $overrides = []): array
    {
        $faker = self::faker();
        
        return array_merge([
            'name' => 'Sucursal ' . $faker->city,
            'address' => $faker->address,
            'phone' => $faker->phoneNumber,
            'email' => $faker->email,
            'latitude' => $faker->latitude(19.0, 20.0), // Mexico City area
            'longitude' => $faker->longitude(-99.5, -98.5), // Mexico City area
            'status' => $faker->randomElement(['active', 'inactive']),
            'created_at' => $faker->dateTimeThisYear->format('Y-m-d H:i:s'),
            'updated_at' => $faker->dateTimeThisYear->format('Y-m-d H:i:s')
        ], $overrides);
    }

    /**
     * Generate test media data
     *
     * @param array $overrides
     * @return array
     */
    public static function generateMediaData(array $overrides = []): array
    {
        $faker = self::faker();
        $filename = $faker->uuid . '.jpg';
        
        return array_merge([
            'filename' => $filename,
            'original_name' => $faker->words(2, true) . '.jpg',
            'mime_type' => 'image/jpeg',
            'size' => $faker->numberBetween(50000, 2000000),
            'path' => '/uploads/media/' . $filename,
            'alt_text' => $faker->sentence(4),
            'created_at' => $faker->dateTimeThisYear->format('Y-m-d H:i:s')
        ], $overrides);
    }

    /**
     * Create a slug from a string
     *
     * @param string $text
     * @return string
     */
    public static function slugify(string $text): string
    {
        // Replace non-alphanumeric characters with hyphens
        $text = preg_replace('/[^a-zA-Z0-9\s]/', '', $text);
        // Replace spaces with hyphens
        $text = preg_replace('/\s+/', '-', $text);
        // Convert to lowercase
        $text = strtolower($text);
        // Remove multiple consecutive hyphens
        $text = preg_replace('/-+/', '-', $text);
        // Remove leading and trailing hyphens
        return trim($text, '-');
    }

    /**
     * Assert that an array has the expected structure
     *
     * @param array $expected
     * @param array $actual
     * @param string $message
     * @return void
     */
    public static function assertArrayStructure(array $expected, array $actual, string $message = ''): void
    {
        foreach ($expected as $key) {
            if (!array_key_exists($key, $actual)) {
                throw new \PHPUnit\Framework\AssertionFailedError(
                    $message ?: "Array does not contain expected key: {$key}"
                );
            }
        }
    }

    /**
     * Create a mock HTTP request
     *
     * @param string $method
     * @param string $uri
     * @param array $data
     * @param array $headers
     * @return array
     */
    public static function createMockRequest(
        string $method = 'GET',
        string $uri = '/',
        array $data = [],
        array $headers = []
    ): array {
        return [
            'method' => strtoupper($method),
            'uri' => $uri,
            'data' => $data,
            'headers' => array_merge([
                'Content-Type' => 'application/json',
                'Accept' => 'application/json'
            ], $headers)
        ];
    }

    /**
     * Create a mock HTTP response
     *
     * @param int $statusCode
     * @param array $data
     * @param array $headers
     * @return array
     */
    public static function createMockResponse(
        int $statusCode = 200,
        array $data = [],
        array $headers = []
    ): array {
        return [
            'status_code' => $statusCode,
            'data' => $data,
            'headers' => array_merge([
                'Content-Type' => 'application/json'
            ], $headers)
        ];
    }
}