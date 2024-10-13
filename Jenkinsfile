pipeline {
    agent any

    environment {
        // Define variables
        DOCKER_IMAGE       = 'earth123456798/seniorfrontend:latest'
        DOCKER_CREDENTIALS = credentials('docker')  // Fetch docker credentials from Jenkins credentials store
    }

    stages {
        stage('Start Jenkins') {
            steps {
                sh 'echo Start Jenkins............'
                sh 'echo docker : user = $DOCKER_CREDENTIALS_USR : password = $DOCKER_CREDENTIALS_PSW'
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('./') {
                    sh 'echo "Running in $(pwd)"'
                    sh 'echo start build the Docker image = $DOCKER_IMAGE'
                    sh 'docker build -t $DOCKER_IMAGE .'  // Build the Docker image
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub
                    sh 'echo $DOCKER_CREDENTIALS_PSW | docker login --username $DOCKER_CREDENTIALS_USR --password-stdin'
                    // Push the image to Docker Hub
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Pull the Docker image from Docker Hub and run the container
                    sh 'docker pull $DOCKER_IMAGE'
                    sh 'docker run -d --name taf -p 8087:3000 $DOCKER_IMAGE'
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
