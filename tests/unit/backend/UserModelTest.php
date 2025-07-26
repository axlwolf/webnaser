<?php

use PHPUnit\Framework\TestCase;
use App\Models\User;

class UserModelTest extends TestCase
{
    public function testPasswordHashing()
    {
        $user = new User();
        $password = 'password123';

        $user->setPassword($password);

        $this->assertNotEmpty($user->getPassword());
        $this->assertNotEquals($password, $user->getPassword());
    }

    public function testPasswordVerification()
    {
        $user = new User();
        $password = 'password123';

        $user->setPassword($password);

        $this->assertTrue($user->verifyPassword($password));
        $this->assertFalse($user->verifyPassword('wrongpassword'));
    }
}
