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





.controller('gameCtrl', function ($scope, $stateParams, $ionicPopup, $interval) {
        var computerstart = true;
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

        var horizontalcheck = function (row, array) {
            if (array[row][0] == array[row][1] && array[row][0] == array[row][2]) {
                return true;
            } else {
                return false;
            };
        };

        var verticalcheck = function (col, array) {
            if (array[0][col] == array[1][col] && array[0][col] == array[2][col]) {
                return true;

            } else {

                return false;
            };

        };

        var diagonalcheck = function (diagonal, array) {
            var val1, val2;
            if (diagonal == 0) {
                val1 = 1;
                val2 = 1;
            } else {
                val1 = 1;
                val2 = -1;
            };
            if (array[1][1] == array[1 + val1][1 + val2] && array[1][1] == array[1 - val1][1 - val2]) {
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
        var playerresult = function (array) {
            var returnval;

            for (var i = 0; i < 3; i++) {
                if (array[i][i] != 0) {
                    //console.log("horizontal " + i + " checking");
                    returnval = horizontalcheck(i, array);
                    if (returnval != true) {
                        // console.log("vertical " + i + " cchecking");
                        returnval = verticalcheck(i, array);
                        if (returnval != true) {
                            if (i < 2) {
                                // console.log("diagonal " + i + " checking");
                                returnval = diagonalcheck(i, array);
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
                        if (playerresult($scope.inputarray)) {
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
        var checkforwinintwosteps = function (mark) {
            var loopbreak = false;
            var twostepwinarray = [];
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {

                    if ($scope.inputarray[i][j] == 0) {

                        $scope.inputarray[i][j] = mark;
                        twostepwinarray = checkloseinonestep(mark);
                        if (twostepwinarray[1] > 0) {
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
        var computermark = function (position) {
            if ($scope.inputarray[position[0]][position[1]] == 0) {
                console.log('im in');
                $scope.inputarray[position[0]][position[1]] = 'X';
                click++;
                if (click > 4) {
                    playerresult($scope.inputarray) ? playerwins('X') : null;
                    //playerwins("X");
                }

            } else {

                //computerplay(level, 'O');

            }


        };
        var checkbest = function (marksarray) {
            console.log("looking for best");
            var bestpositions = [];
            var bestmark = 0;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (marksarray[i][j] > bestmark) {
                        bestpositions = [];
                        bestpositions.push([i, j]);
                        bestmark = marksarray[i][j];
                    } else {
                        if (marksarray[i][j] == bestmark) {
                            bestpositions.push([i, j]);
                        }
                    };
                };
            };
            console.log(bestpositions);
            var bestrandom;
            console.log(bestpositions.length);
            if (bestpositions.length > 1) {
                bestrandom = (Math.floor((Math.random() * bestpositions.length) + 1)) - 1;
            } else {
                bestrandom = 0;
            };
            console.log(bestrandom);
            console.log(bestpositions[bestrandom]);
            return bestpositions[bestrandom];
        };

        var bestposition = function (level, mark, arr, bestposthread) {
            var dummyarray = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            if (bestposthread) {
                for (var q = 0; q < 3; q++) {
                    for (var w = 0; w < 3; w++) {
                        if (arr != 0) {
                            dummyarray[q][w] = arr[q][w];
                        };
                    };
                };
            } else {
                for (var q = 0; q < 3; q++) {
                    for (var w = 0; w < 3; w++) {
                        if ($scope.inputarray[q][w] != 0) {
                            dummyarray[q][w] = $scope.inputarray[q][w];
                        };
                    };
                };
            };

            console.log(dummyarray);
            var dummy = [];
            var markposition = [];
            var currmark;
            var chance = 0;
            var iterate = 0;
            var result = false;
            var marksarray = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];


            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    //checking should happen on copy array
                    if (bestposthread) {
                        for (var e = 0; e < 3; e++) {
                            for (var r = 0; r < 3; r++) {
                                if (arr[e][r] == 0) {
                                    dummyarray[e][r] = 0;
                                };
                            };
                        };
                    } else {
                        for (var e = 0; e < 3; e++) {
                            for (var r = 0; r < 3; r++) {
                                if ($scope.inputarray[e][r] == 0) {
                                    dummyarray[e][r] = 0;
                                };
                            };
                        };
                    };
                    //reset vars
                    result = false;
                    chance = 0 + iterate;

                    if (dummyarray[i][j] == 0) {
                        dummyarray[i][j] = mark;

                        while (dummyarray[0].indexOf(0) >= 0 || dummyarray[1].indexOf(0) >= 0 || dummyarray[2].indexOf(0) >= 0) {
                            if (chance % 2 == 0) {
                                coin = mark;
                                opmark = (mark == "X" ? "O" : "X");
                            } else {
                                coin = (mark == "X" ? "O" : "X");
                                opmark = mark;
                            };
                            chance++;

                            console.log("calling play mode");
                            markposition = computerplay("difficult", opmark, dummyarray);
                            console.log(markposition);
                            dummyarray[markposition[0]][markposition[1]] = opmark;
                            if (playerresult(dummyarray)) {
                                result = true;
                                if (opmark != mark) {
                                    console.log("-10 de");
                                    marksarray[i][j] -= 10;
                                    break;
                                } else {
                                    console.log("+10 de");
                                    marksarray[i][j] += 10;
                                    break;
                                };
                            };
                        };
                        if (!result) {
                            console.log("+1 de");
                            marksarray[i][j] += 5;
                        };
                        //break will come here
                    };
                    chance = 0;
                    iterate++;
                };
            };
            console.log(marksarray);
            var bespost = checkbest(marksarray);
            console.log(bespost);
            return bespost;



        };
        var computerplay = function (level, value, arr) {
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

                    positionarray = checkloseinonestep(value); //CHECK FOR WIN
                    if (positionarray[0] < 0) {

                        positionarray = checkloseinonestep(value == "X" ? "O" : "X"); //CHECK FOR LOOSE
                        if (positionarray[0] < 0) {
                            console.log("logic");
                            positionarray = bestposition(level, value, arr, true);
                        };
                    };
                };
            };
            row = positionarray[0];
            col = positionarray[1];

            /*console.log(row);
            console.log(col);*/
            return positionarray;



        }
        $scope.playerclick = function (pindex, cindex) {


            if ($scope.game == true) {

                if ($scope.inputarray[pindex][cindex] == 0) {
                    if (turn == true) {
                        console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
                        $scope.inputarray[pindex][cindex] = 'O';
                        click++;
                        if (click > 4) {
                            playerresult($scope.inputarray) ? playerwins("O") : null;
                        };
                        //  console.log($scope.inputarray);
                        if (click < 9) {
                            if ($scope.game == true) {
                                var pos = computerplay(level, "X", $scope.inputarray);
                                if (pos[0] > -1) {
                                    $interval(computermark(pos), 1000, 1);
                                };

                            };
                        };

                    };


                    //console.log(turn);

                };
            };


        };


    })
    .controller('searchCtrl', function ($scope, $stateParams, $ionicPopup, $ionicModal) {


        $scope.level = 0;









    })