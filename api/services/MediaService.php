<?php

namespace App\Services;

use App\Models\Interfaces\MediaRepositoryInterface;
use App\Models\Media;

class MediaService {
    private MediaRepositoryInterface $mediaRepository;
    private string $uploadDir;
    private int $maxUploadSize;
    private array $allowedExtensions;

    public function __construct(MediaRepositoryInterface $mediaRepository, string $uploadDir, int $maxUploadSize, array $allowedExtensions) {
        $this->mediaRepository = $mediaRepository;
        $this->uploadDir = $uploadDir;
        $this->maxUploadSize = $maxUploadSize;
        $this->allowedExtensions = $allowedExtensions;

        if (!is_dir($this->uploadDir)) {
            mkdir($this->uploadDir, 0777, true);
        }
    }

    public function getAllMedia(int $pageNum, int $limit): array {
        $media = $this->mediaRepository->findAll($pageNum, $limit);
        $total = $this->mediaRepository->count();
        return ['media' => $media, 'total' => $total];
    }

    public function getMediaById(int $id): ?Media {
        return $this->mediaRepository->findById($id);
    }

    public function uploadMedia(array $file): ?Media {
        if ($file['error'] !== UPLOAD_ERR_OK) {
            return null;
        }

        if ($file['size'] > $this->maxUploadSize) {
            return null;
        }

        $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($fileExtension, $this->allowedExtensions)) {
            return null;
        }

        $filename = uniqid() . '.' . $fileExtension;
        $destination = $this->uploadDir . $filename;

        if ($this->moveUploadedFile($file['tmp_name'], $destination)) {
            // Crear y guardar el objeto Media
            $media = new Media();
            $media->filename = $filename;
            $media->original_filename = $file['name'];
            $media->mime_type = $file['type'];
            $media->size = $file['size'];
            $media->url = '/public/uploads/' . $filename;
            
            // Generar thumbnail para imágenes si es necesario
            if (strpos($file['type'], 'image/') === 0) {
                $media->thumbnail_url = '/public/uploads/thumbnails/' . $filename;
            }
            
            // Guardar en la base de datos
            $savedMedia = $this->mediaRepository->save($media);
            if ($savedMedia && $savedMedia->id) {
                return $savedMedia;
            }
            
            // Si no se pudo guardar en la base de datos, eliminar el archivo
            if (file_exists($destination)) {
                unlink($destination);
            }
            return null;
        } else {
            error_log("Failed to move uploaded file from " . $file['tmp_name'] . " to " . $destination);
            return null; // DEBUG: Fallo al mover archivo
        }
    }

    protected function moveUploadedFile(string $source, string $destination): bool {
        return move_uploaded_file($source, $destination);
    }

    public function deleteMedia(int $id): bool {
        $media = $this->mediaRepository->findById($id);
        if (!$media) {
            return false;
        }

        $filePath = $this->uploadDir . $media->filename;
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        return $this->mediaRepository->delete($id);
    }
}
