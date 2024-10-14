pipeline {
    agent any

    environment {
        DOCKER_IMAGE_FRONTEND = 'earth123456789/seniorfrontend:latest'
        DOCKER_IMAGE_BACKEND = 'earth123456789/seniorbackend:latest'
        DOCKER_CREDENTIALS = credentials('dockerhub')
    }


    stages {
        stage('Start Jenkins') {
            steps {
                // Checkout your source code from version control
             
                    sh 'echo Start Jenkins............'
                    sh 'echo docker : user = $DOCKER_CREDENTIALS_USR : password = $DOCKER_CREDENTIALS_PSW'
            }
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    // Checkout source code from repository
                    echo 'Checking out code...'
                    git url: 'https://github.com/bbiiw/SeniorLink.git', branch: 'main'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    // Build Docker image for frontend
                    echo 'Building frontend Docker image...'
                    dir('frontend') {
                        sh 'docker build -t $DOCKER_IMAGE_FRONTEND .'
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    // Build Docker image for backend
                    echo 'Building backend Docker image...'
                    dir('backend') {
                        sh 'docker build -t $DOCKER_IMAGE_BACKEND .'
                    }
                }
            }
        }

        stage('Push Frontend Docker Image to Docker Hub') {
            steps {
                script {
                    // Push frontend Docker image to Docker Hub
                    echo 'Pushing frontend Docker image to Docker Hub...'
                    sh 'echo $DOCKER_CREDENTIALS_PSW | docker login --username $DOCKER_CREDENTIALS_USR --password-stdin'
                    sh 'docker push $DOCKER_IMAGE_FRONTEND'
                }
            }
        }

        stage('Push Backend Docker Image to Docker Hub') {
            steps {
                script {
                    // Push backend Docker image to Docker Hub
                    echo 'Pushing backend Docker image to Docker Hub...'
                    sh 'echo $DOCKER_CREDENTIALS_PSW | docker login --username $DOCKER_CREDENTIALS_USR --password-stdin'
                    sh 'docker push $DOCKER_IMAGE_BACKEND'
                }
            }
        }

        stage('Start Docker Compose') {
            steps {
                script {
                    // Start services using Docker Compose
                    echo 'Starting services with Docker Compose...'
                    sh 'docker-compose -f docker-compose.yml up --build -d'
                }
            }
        }
    }

    post {
        always {
            // Logout from Docker Hub
            sh 'docker logout'
        }
    }
}
