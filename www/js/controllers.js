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
        var horizontalcheck = function (row) {
            if ($scope.inputarray[row][0] == $scope.inputarray[row][1] && $scope.inputarray[row][0] == $scope.inputarray[row][2]) {
                return true;
            } else {
                return false;
            };
        };

        var verticalcheck = function (col) {
            if ($scope.inputarray[0][col] == $scope.inputarray[1][col] && $scope.inputarray[0][col] == $scope.inputarray[2][col]) {
                return true;

            } else {

                return false;
            };

        };

        var diagonalcheck = function (diagonal) {
            var val1, val2;
            if (diagonal == 0) {
                val1 = 1;
                val2 = 1;
            } else {
                val1 = 1;
                val2 = -1;
            };
            if ($scope.inputarray[1][1] == $scope.inputarray[1 + val1][1 + val2] && $scope.inputarray[1][1] == $scope.inputarray[1 - val1][1 - val2]) {
                return true;
            } else {
                return false;
            };
        };

        var result = function (winner) {
            $ionicPopup.show({

                template: '<center><h1>' + winner + ' is the winner </h1></center',

                buttons: [

                    {
                        text: '<b>Replay</b>',
                        type: 'button-positive',
                        onTap: function () {
                            console.log(click);
                            click = 0;
                            $scope.inputarray = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
                            turn = true;
                            $scope.game = true;
                            //  console.log("called");

                        }
      }
    ]
            });



        };

        $scope.game = true;
        var playerwins = function (mark) {
            $scope.game = false;
            result(mark);
            console.log("YOU WON");
        };
        var playerresult = function (mark) {
            var returnval;
            if (click > 4) {
                for (var i = 0; i < 3; i++) {
                    if ($scope.inputarray[i][i] != 0) {
                        console.log("horizontal " + i + " checking");
                        returnval = horizontalcheck(i);
                        if (returnval != true) {
                            console.log("vertical " + i + " cchecking");
                            returnval = verticalcheck(i);
                            if (returnval != true) {
                                if (i < 2) {
                                    console.log("diagonal " + i + " checking");
                                    returnval = diagonalcheck(i);
                                    if (returnval != true) {
                                        //break;
                                    } else {
                                        playerwins(mark);
                                        break;
                                    };
                                } else {
                                    //break;
                                };
                            } else {
                                playerwins(mark);
                                break;
                            };
                        } else {
                            playerwins(mark);
                            break;
                        };
                    };

                };
                if (click == 9) {
                    if($scope.game == true)
                    {
                        $scope.game = false;
                        result('No one');
                    };
                };
                console.log(returnval);
            };

        };
        var computerplay = function () {
            //
            // console.log($scope.inputarray);
            var row = Math.floor(Math.random() * 3);
            var col = Math.floor(Math.random() * 3);
            /*console.log(row);
            console.log(col);*/
            if ($scope.inputarray[row][col] == 0) {
                $scope.inputarray[row][col] = 'X';
                click++;
                playerresult("X");

            } else {

                computerplay();

            }
        }
        $scope.playerclick = function (pindex, cindex) {


            if ($scope.game == true) {

                if ($scope.inputarray[pindex][cindex] == 0) {
                    if (turn == true) {
                        $scope.inputarray[pindex][cindex] = 'O';
                        click++;
                        playerresult("O");
                        //  console.log($scope.inputarray);
                        if (click < 9) {
                            if ($scope.game == true) {
                                computerplay();
                            }
                        };

                    }


                    //console.log(turn);

                };
            };


        };


    })
    .controller('searchCtrl', function ($scope, $stateParams, $ionicPopup, $ionicModal) {


        $scope.level = 0;









    })