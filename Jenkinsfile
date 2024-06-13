pipeline {
    agent any

    environment {
        PATH = "/usr/local/opt/node@20/bin:/usr/local/bin:/usr/bin:/bin"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
                echo 'Checked out source code from SCM'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('simple-web-app') {
                    nodejs('Node-20.14.0') {
                        // Combine dependency installations
                        sh '/usr/local/opt/node@20/bin/npm install react-scripts@latest nth-check@2.0.1 postcss@8.4.31 serialize-javascript@6.0.2 --save-dev'
                        sh '/usr/local/opt/node@20/bin/npm update' // This may still be slow, consider using a package-lock.json
                    }
                }
            }
        }

        // stage('Static Code Analysis') {
        //     steps {
        //         dir('simple-web-app') {
        //             nodejs('Node-20.14.0') {
        //                 sh '/usr/local/opt/node@20/bin/npx eslint .'
        //             }
        //         }
        //     }
        // }

        stage('Install Snyk CLI') {
            steps {
                // Install Snyk globally only once, not in each pipeline run
                sh 'if ! command -v snyk &> /dev/null; then /usr/local/opt/node@20/bin/npm install -g snyk; fi'
            }
        }

        stage('Security Scan') {
            steps {
                withCredentials([string(credentialsId: 'snyk-api-token', variable: 'SNYK_TOKEN')]) {
                    script {
                        dir('simple-web-app') {
                            sh 'snyk auth $SNYK_TOKEN'
                            sh 'snyk test --all-projects || true' // Allow the build to continue even if vulnerabilities are found
                        }
                    }
                }
            }
        }

        // Uncomment this section if you have a SonarQube or similar setup for quality gate
        // stage('Quality Gate') {
        //     steps {
        //         script {
        //             def qualityGate = waitForQualityGate()
        //             if (qualityGate.status != 'OK') {
        //                 error "Failed quality gate: ${qualityGate.status}"
        //             }
        //         }
        //     }
        // }

        stage('Manual Approval') {
            steps {
                input "Please approve the deployment to QA environment"
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('simple-web-app') {
                    nodejs('Node-20.14.0') {
                        sh '/usr/local/opt/node@20/bin/npm install'
                    }
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('simple-web-app/client') {
                    nodejs('Node-20.14.0') {
                        sh '/usr/local/opt/node@20/bin/npm install'
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('simple-web-app/client') {
                    nodejs('Node-20.14.0') {
                        sh '/usr/local/opt/node@20/bin/npm run build'
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'simple-web-app/client/build/**/*', allowEmptyArchive: true
        }
        success {
            echo 'Build was successful!'
        }
        failure {
            echo 'Build failed. Please check the logs for details.'
        }
    }
}
