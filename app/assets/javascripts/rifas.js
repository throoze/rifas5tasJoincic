var iniciado = false;
var running = false;
var slowDown = false;
var initDelay = 100;
var delay = initDelay;
var index = 0;
var participants;
var raffle;
var testdata;

function setRaffleTypeListener() {
    $('#rifa').on('change', function(event){
        var rifa = $(this);
        if (rifa.val() != '' && rifa.val() != null) {
            $.ajax({
                url: '/home/getParticipants',
                type: 'POST',
                dataType: 'json',
                data: {
                    raffle : rifa.val()
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    smoke.alert('Ocurrió un error!:\n' + textStatus);
                },
                success: function(data, textStatus, jqXHR) {
                    participants = data[0];
                    raffle = data[1];
                    $('#roulette_button').removeAttr('disabled');
                }
            })
        }
    });
}

function setRouletteListener(){
    $('#roulette').on('submit', function(event){
        event.preventDefault();
        if (!running) {
            running = true;
            $('#roulette_button').val('Parar!');
            initRoulette(participants);
        } else {
            running = false;
            $('#roulette_button').attr("disabled", "disabled");
            $('#roulette_button').val('Iniciar!');
        }
    });
}

function setListeners() {
    setRaffleTypeListener();
    setRouletteListener();
}

function initRoulette(people){
    window.setTimeout(function(){
        //Si se ha presiendo el boton de parar
        //convirtiendo @stop_it en true, se selecciona
        // el ganador y se cierra el sorteo
        if(!running){
            if (delay > 700) {
                slowDown = true;
            }
            if (!slowDown) {
                delay += 100;
            } else {
                //var casilla_ganadora = Math.floor(Math.random()*people.length);
                //var ganador          = people[casilla_ganadora];
                //$("#concursante").text("");
                $("#winner").val(people[index].name + ' - ' + people[index].ci);
                winner = people[index];
                smoke.confirm("El ganador es "+ people[index].name + ' - ' + people[index].ci + '\n Marcar a este usuario como ganador?', function(e){
                    if (e) {
                        $.ajax({
                            url: '/home/setWinner',
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                winner : winner,
                                raffle : raffle
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                smoke.alert('Ocurrió un error!:\n' + textStatus);
                            },
                            success: function(data, textStatus, jqXHR) {
                                testdata = data;
                                if (data.error) {
                                    smoke.alert('Ha ocurrido un error:\n'+data.error);
                                } else {
                                    smoke.alert('Ganador registrado con éxito!:\nNombre: '+data[0].winner.name+'\nCédula: ' + data[0].winner.ci);
                                }
                            },
                            complete: function() {
                                iniciado = false;
                                running = true;
                                slowDown = false;
                                initDelay = 100;
                                delay = initDelay;
                                index = 0;
                                participants;
                                raffle;
                                $('#winner').val('');
                                $('#rifa').val('');
                                $('#roulette_button').removeAttr('disabled');
                            }
                        });
                    } else {
                        $('#roulette_button').removeAttr('disabled');
                        $('#roulette_button').val('Parar!');
                        running = true;
                        slowDown = false;
                        delay = initDelay;
                        if(index < participants.length - 1){
                            index++;
                        } else {
                            index = 0;
                        }
                        initRoulette(people);
                    }
                });
                return false;
            }
        }

        $("#winner").val(people[index].name + ' - ' + people[index].ci);
        //Si el contador llega al final, se reinicia
        if(index < participants.length - 1){
            index++;
        } else {
            index = 0;
        }
        initRoulette(people);
    },
    delay
    );
}

$(document).ready(function(){
    setListeners();
});