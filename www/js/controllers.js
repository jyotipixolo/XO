angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
        {
            title: 'Reggae',
            id: 1
        },
        {
            title: 'Chill',
            id: 2
        },
        {
            title: 'Dubstep',
            id: 3
        },
        {
            title: 'Indie',
            id: 4
        },
        {
            title: 'Rap',
            id: 5
        },
        {
            title: 'Cowbell',
            id: 6
        }
  ];
})

.controller('PlaylistCtrl', function ($scope, $stateParams, $ionicPopup) {
        var click = 0;
        $scope.inputarray = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        var turn = true;
        var result = function (winner) {
            $ionicPopup.show({

                template: '<center><h1>' + winner + ' is a winner </h1></center',

                buttons: [

                    {
                        text: '<b>Replay</b>',
                        type: 'button-positive',
                        onTap: function () {
                            console.log(click);
                            click = 0;
                            $scope.inputarray = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
                            turn = true;
                            console.log("called");

                        }
      }
    ]
            });



        };
        var playerresult = function () {

            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if ($scope.inputarray[i][j] == $scope.inputarray[i][j + 1] && $scope.inputarray[i][j] == $scope.inputarray[i][j + 2] && j == 0) {
                        result($scope.inputarray[i][j]);
                        break;
                    } else if ($scope.inputarray[i][j] == $scope.inputarray[i + 1][j] && $scope.inputarray[i][j] == $scope.inputarray[i + 2][j] && i == 0) {
                        result($scope.inputarray[i][j]);
                        break;
                    } else if (i == j && i == 1) {
                        if (($scope.inputarray[i][j] == $scope.inputarray[i + 1][j - 1] && $scope.inputarray[i][j] == $scope.inputarray[i - 1][j + 1]) || ($scope.inputarray[i][j] == $scope.inputarray[i + 1][j + 1] && $scope.inputarray[i][j] == $scope.inputarray[i - 1][j - 1]))
                            result($scope.inputarray[i][j]);
                        break;
                    } else {
                        if (click == 9) {
                            result("No one");
                            break;
                        }
                    }
                }
            };

        };
    var computerplay=function()
    {
        console.log($scope.inputarray);
       var row=Math.floor(Math.random()*3) ;
       var col=Math.floor(Math.random()*3) ;
        console.log(row);
        console.log(col);
        if($scope.inputarray[row][col]==0)
        {
          $scope.inputarray[row][col]='X';  
            click++;
            
        }
        else{
            
        computerplay();
        
        }
    }
        $scope.playerclick = function (pindex, cindex) {
            if ($scope.inputarray[pindex][cindex] == 0) {
                if (turn == true) {
                    $scope.inputarray[pindex][cindex] = 'O';
                    console.log($scope.inputarray);
                    click++;
                    if (click < 9)
                    computerplay();
                } 

                
                console.log(turn);

            };
           // playerresult();

        };


    })
    .controller('searchCtrl', function ($scope, $stateParams, $ionicPopup, $ionicModal) {


        $scope.level = 0;









    })