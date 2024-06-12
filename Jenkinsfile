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
                echo 'Checked out source code from SCM'
            }
        }

        stage('Software Version') {
            steps {
                // Checking for the software version set Globally 
                sh 'echo "My node Version is: $(/usr/local/opt/node@20/bin/node --version)"'
                sh 'echo "My npm version is: $(/usr/local/opt/node@20/bin/npm --version)"'
            }
        }
        
        stage('Install Backend Dependencies') {
            steps {
                script {
                    dir('simple-web-app') {
                        // Use NodeJS plugin to set the Node version
                        nodejs('Node-20.14.0') {
                            sh '/usr/local/opt/node@20/bin/npm install'
                        }
                    }
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                script {
                    dir('simple-web-app') {
                        nodejs('Node-20.14.0') {
                            sh '/usr/local/opt/node@20/bin/npm test'
                        }
                    }
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                script {
                    dir('simple-web-app/client') {
                        nodejs('Node-20.14.0') {
                            sh '/usr/local/opt/node@20/bin/npm install'
                        }
                    }
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                script {
                    dir('simple-web-app/client') {
                        nodejs('Node-20.14.0') {
                            sh '/usr/local/opt/node@20/bin/npm test'
                        }
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    dir('simple-web-app/client') {
                        nodejs('Node-20.14.0') {
                            sh '/usr/local/opt/node@20/bin/npm run build'
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
