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

        stage('Docker Login') {
            steps {
                // Use Jenkins credentials for Docker Hub login
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS}", usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                    script {
                        sh "echo \$DOCKERHUB_PASSWORD | docker login -u \$DOCKERHUB_USERNAME --password-stdin"
                    }
                }
            }
        }

        stage('Build, Tag & Push Docker Images') {
            parallel {
                stage('Frontend') {
                    steps {
                        script {
                            sh "docker build -t ${FRONTEND_IMAGE}:latest ./frontend"
                            sh "docker tag ${FRONTEND_IMAGE}:latest ${DOCKERHUB_USERNAME}/${FRONTEND_IMAGE}:latest"
                            sh "docker push ${DOCKERHUB_USERNAME}/${FRONTEND_IMAGE}:latest"
                        }
                    }
                }

                stage('Backend') {
                    steps {
                        script {
                            sh "docker build -t ${BACKEND_IMAGE}:latest ./backend"
                            sh "docker tag ${BACKEND_IMAGE}:latest ${DOCKERHUB_USERNAME}/${BACKEND_IMAGE}:latest"
                            sh "docker push ${DOCKERHUB_USERNAME}/${BACKEND_IMAGE}:latest"
                        }
                    }
                }
            }
        }
    }

}