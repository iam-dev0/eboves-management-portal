

pipeline {
  agent any

  // environment {
  //       API_URL = 'http://172.104.186.220:4041/'
  //   }
  stages {
    // stage('Prepare Workspace') {
    //   steps {
    //     script {
    //           // Determine whether this is a test or a staging / production build                    
    //           switch (BRANCH_NAME) {
    //               case 'dev':
    //                   API_URL = 'http://172.104.186.220:4041/'
    //                   break
    //               case 'master':
    //                   API_URL = 'http://172.104.186.220:4040/'
    //                   break
    //               default: 
    //                  API_URL = 'http://172.104.186.220:4041/'
    //                   break
    //             }
    //       }
    //     sh 'yarn'
    //   }
    // }

    // stage('build') {
    //   steps {
    //     sh 'yarn build'
    //   }
    // }

    stage('deploy dev') {
      when {
        expression {
          BRANCH_NAME == 'dev'
        }

      }
      steps {
        echo 'deploying'
        sh '''ssh cdjenkins@172.104.186.220 \'
              cd /var/www/StagingServer/BackOffice
              git stash
              git pull
              git checkout dev 

              yarn
              yarn build

            \'
            '''
      }
    }

    stage('deploy master') {
      when {
        expression {
          BRANCH_NAME == 'master'
        }

      }
      steps {
        echo 'deploying'
        sh '''ssh cdjenkins@172.104.186.220 \'
              cd /var/www/LiverServer/BackOffice
              git stash
              git pull
              git checkout master 

              yarn
              yarn build

            \'
            '''
      }
    }

  }
}
