pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub'  // Jenkins credential ID
        DOCKERHUB_USERNAME = 'chinthaka7'
        FRONTEND_IMAGE = 'smart_bookmark_manager-frontend'
        BACKEND_IMAGE  = 'smart_bookmark_manager-backend'
        GIT_REPO       = 'https://github.com/chinthakadd7/Smart_Bookmark_Manager.git'
        GIT_BRANCH     = 'main'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: "${GIT_BRANCH}", url: "${GIT_REPO}"
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build Frontend') {
                    steps {
                        script {
                            sh "docker build -t ${FRONTEND_IMAGE}:latest ./frontend"
                        }
                    }
                }
                stage('Build Backend') {
                    steps {
                        script {
                            sh "docker build -t ${BACKEND_IMAGE}:latest ./backend"
                        }
                    }
                }
            }
        }

        stage('Push Docker Images') {
            parallel {
                stage('Push Frontend') {
                    steps {
                        script {
                            docker.withRegistry('https://registry.hub.docker.com', "${DOCKERHUB_CREDENTIALS}") {
                                sh "docker tag ${FRONTEND_IMAGE}:latest ${DOCKERHUB_USERNAME}/${FRONTEND_IMAGE}:latest"
                                sh "docker push ${DOCKERHUB_USERNAME}/${FRONTEND_IMAGE}:latest"
                            }
                        }
                    }
                }
                stage('Push Backend') {
                    steps {
                        script {
                            docker.withRegistry('https://registry.hub.docker.com', "${DOCKERHUB_CREDENTIALS}") {
                                sh "docker tag ${BACKEND_IMAGE}:latest ${DOCKERHUB_USERNAME}/${BACKEND_IMAGE}:latest"
                                sh "docker push ${DOCKERHUB_USERNAME}/${BACKEND_IMAGE}:latest"
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                // Logout from Docker Hub and clean up images
                sh '''
                    docker logout
                    docker image prune -af || true
                '''
            }
        }
    }
}
