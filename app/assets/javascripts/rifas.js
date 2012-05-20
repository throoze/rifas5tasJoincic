
var iniciado = false;
var participants;

function setListeners() {
    $('#rifa').on('change', function(event){
        var rifa = $(this);
        if (rifa.val() != '' && rifa.val() != null) {
            $.ajax({
                url: '/home/getParticipants',
                type: 'POST',
                dataType: 'json',
                data: {raffle : rifa.val()},
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Error!');
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                },
                success: function(data, textStatus, jqXHR) {
                    console.log('Success!')
                    console.log(data);
                },
            })
        }
    });
}

$(document).ready(function(){
    setListeners();
});