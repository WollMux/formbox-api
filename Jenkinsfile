#!/usr/bin/env groovy

pipeline {
  agent {label 'formbox'}

  options { disableConcurrentBuilds() }

  tools {nodejs 'node6.11.3'}

  environment {
    DISABLE_SSL = 'true'
  }

  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build-jenkins'
      }
    }

    stage('Quality Gate') {
      steps {
        withEnv(['HOST=localhost', 'ASSETS=assets', 'CONFIG=config', 'DISABLE_SSL=true']) {
          sh '''#!/bin/bash
          CHECK="init"
          while [ -n "$CHECK" ]; do
            PORT=$(shuf -i 50000-51000 -n 1)
            CHECK=$(netstat -a)
            if [[ $CHECK != *"$PORT"* ]]; then
              CHECK=""
            fi
          done
          npm run test
          '''
        }
      }
      post {
        always {
          junit '.testresults/*.xml'
          script {
            if (GIT_BRANCH == 'master') {
              withSonarQubeEnv('SonarQube') {
                sh 'npm run sonar'
              }
              timeout(time: 1, unit: 'HOURS') {
                script {
                  def qg = waitForQualityGate()
                  if (qg.status != 'OK') {
                    error "Pipeline abgebrochen auf Grund von Quality Gate Fehlern: ${qg.status}"
                  }
                }
              }
            } else {
              withSonarQubeEnv('SonarQube') {
                withCredentials([usernamePassword(credentialsId: '3eaee9fd-bbdd-4825-a4fd-6b011f9a84c3', passwordVariable: 'GITHUB_ACCESS_TOKEN', usernameVariable: 'USER')]) {
                  sh "npm run sonar -- -Dsonar.analysis.mode=preview -Dsonar.github.pullRequest=${env.CHANGE_ID} \
                      -Dsonar.github.repository=wollmux/formbox-api \
                      -Dsonar.github.oauth=${GITHUB_ACCESS_TOKEN}"
                }
              }
            }
          }
        }
      }
    }

    stage('Deploy') {
      when {
        branch 'master'
      }
      steps {
        sh '''npm pack
          mv formbox-api*.tgz /srv/formbox-api
          cd /srv/formbox-api
          npm install formbox-api*.tgz
          pm2 restart formbox-api'''
      }
    }
  }
}
