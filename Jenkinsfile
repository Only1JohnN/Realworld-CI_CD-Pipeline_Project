pipeline {
    agent any

    stages {
        stage('Clean Workspace') {
            steps {
                deleteDir() // Clean workspace before each build
            }
        }

        stage('Checkout') {
            steps {
                // Checkout the code from the current branch
                checkout scm
                echo 'Checked out source code from SCM' // Added echo statement
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                script {
                    dir('simple-web-app') {
                        // Use NodeJS plugin to set the Node version
                        nodejs(nodeJSInstallationName: 'Node-20.14.0') {
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                script {
                    dir('simple-web-app') {
                        nodejs(nodeJSInstallationName: 'Node-20.14.0') {
                            sh 'npm test'
                        }
                    }
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                script {
                    dir('simple-web-app/client') {
                        nodejs(nodeJSInstallationName: 'Node-20.14.0') {
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                script {
                    dir('simple-web-app/client') {
                        nodejs(nodeJSInstallationName: 'Node-20.14.0') {
                            sh 'npm test'
                        }
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    dir('simple-web-app/client') {
                        nodejs(nodeJSInstallationName: 'Node-20.14.0') {
                            sh 'npm run build'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            // Archive the frontend build artifacts
            archiveArtifacts artifacts: 'simple-web-app/client/build/**/*', allowEmptyArchive: true
            // Publish test results for both frontend and backend
            junit 'simple-web-app/test-results/**/*.xml'
        }
        success {
            echo 'Build was successful!'
        }
        failure {
            echo 'Build failed. Please check the logs for details.'
        }
    }
}
