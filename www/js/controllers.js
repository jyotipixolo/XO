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

.controller('selectCtrl', function ($scope) {
    
    
    
})





.controller('gameCtrl', function ($scope, $stateParams, $ionicPopup) {
        var computerstart = false;
        var turn;
        var level;
        var click;
        var result;
        var start = function () {
            console.log('called');
            computerstart = !computerstart;
            level = 'difficult';
            click = 0;
            $scope.inputarray = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            turn = true;

            if (computerstart) {
                $scope.inputarray[1][1] = 'X';
                click++

            }
        }
        console.log(computerstart);
        $scope.$on('$ionicView.enter', function () {

            start();

        });

        var firstmoveafterplayer = function () {
            if ($scope.inputarray[1][1] == 'O') {

                return [Math.random() < 0.5 ? 0 : 2, Math.random() < 0.5 ? 0 : 2];

            } else {

                return [1, 1];
            };


        };

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
                            //  console.log(click);
                            /* click = 0;
                             $scope.inputarray = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
                             computerstart=!computerstart;
                             console.log(computerstart);
                             turn = true;*/
                            $scope.game = true;
                            start();
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
            ////.log("YOU WON");
        };
        var playerresult = function () {
            var returnval;

            for (var i = 0; i < 3; i++) {
                if ($scope.inputarray[i][i] != 0) {
                    //console.log("horizontal " + i + " checking");
                    returnval = horizontalcheck(i);
                    if (returnval != true) {
                        // console.log("vertical " + i + " cchecking");
                        returnval = verticalcheck(i);
                        if (returnval != true) {
                            if (i < 2) {
                                // console.log("diagonal " + i + " checking");
                                returnval = diagonalcheck(i);
                                if (returnval != true) {
                                    //break;
                                } else {
                                    return true; //
                                    break;
                                };
                            } else {
                                //break;
                            };
                        } else {
                            return true;;
                            break;
                        };
                    } else {
                        return true;;
                        break;
                    };
                };

            };
            if (click == 9) {
                if ($scope.game == true) {
                    $scope.game = false;
                    result('No one');
                };
            };
            //console.log(returnval);


        };
        var checkloseinonestep = function (mark) {
            var loopbreak = false;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {

                    if ($scope.inputarray[i][j] == 0) {

                        $scope.inputarray[i][j] = mark;
                        if (playerresult()) {
                            $scope.inputarray[i][j] = 0;
                            // computermark(i, j);
                            loopbreak = true;
                            return [i, j];
                            //break;
                        } else {
                            $scope.inputarray[i][j] = 0;
                        };
                        console.log('returned');
                    }
                    if (loopbreak) {
                        break;
                    }

                };
                if (loopbreak) {
                    break;
                }



            };

            return [-1, -1];

        };
        var computermark = function (row, col) {
            if ($scope.inputarray[row][col] == 0) {
                console.log('im in');
                $scope.inputarray[row][col] = 'X';
                click++;
                if (click > 4) {
                    playerresult() ? playerwins('X') : null;
                    //playerwins("X");
                }

            } else {

                computerplay();

            }


        }
        var computerplay = function (level) {
            var row;
            var col;
            var positionarray = [];
            // console.log($scope.inputarray);
            if (level == 'easy') {
                row = Math.floor(Math.random() * 3);
                col = Math.floor(Math.random() * 3);
            } else if (level == 'medium') {



            } else if (level == 'difficult') {
                if (click == 1) {
                    positionarray = firstmoveafterplayer();
                    console.log(positionarray);

                } else {

                    positionarray = checkloseinonestep("X"); //CHECK FOR WIN
                    if (positionarray[0] < 0) {

                        positionarray = checkloseinonestep("O"); //CHECK FOR LOOSE
                        if (positionarray[0] < 0) {

                            console.log("logic");

                        }
                    }
                }
                row = positionarray[0];
                col = positionarray[1];
            }
            /*console.log(row);
            console.log(col);*/
            computermark(row, col);



        }
        $scope.playerclick = function (pindex, cindex) {


            if ($scope.game == true) {

                if ($scope.inputarray[pindex][cindex] == 0) {
                    if (turn == true) {
                        $scope.inputarray[pindex][cindex] = 'O';
                        click++;
                        if (click > 4) {
                            playerresult() ? playerwins("O") : null;




                        }
                        //  console.log($scope.inputarray);
                        if (click < 9) {
                            if ($scope.game == true) {
                                computerplay(level);

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