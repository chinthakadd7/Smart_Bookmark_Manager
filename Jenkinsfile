pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub' // Jenkins credential ID
        DOCKERHUB_USERNAME = 'chinthaka7'
        FRONTEND_IMAGE = 'smart_bookmark_manager-frontend'
        BACKEND_IMAGE  = 'smart_bookmark_manager-backend'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/chinthakadd7/Smart_Bookmark_Manager.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh "docker build -t ${FRONTEND_IMAGE}:latest ./frontend"
                    sh "docker build -t ${BACKEND_IMAGE}:latest ./backend"
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', "${DOCKERHUB_CREDENTIALS}") {
                        echo "Logged in to Docker Hub"
                    }
                }
            }
        }

        stage('Tag & Push Images') {
            steps {
                script {
                    sh "docker tag ${FRONTEND_IMAGE}:latest ${DOCKERHUB_USERNAME}/${FRONTEND_IMAGE}:latest"
                    sh "docker tag ${BACKEND_IMAGE}:latest ${DOCKERHUB_USERNAME}/${BACKEND_IMAGE}:latest"
                    sh "docker push ${DOCKERHUB_USERNAME}/${FRONTEND_IMAGE}:latest"
                    sh "docker push ${DOCKERHUB_USERNAME}/${BACKEND_IMAGE}:latest"
                }
            }
        }
    }
}
