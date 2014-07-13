/**
 * Created by chrisminnick on 7/13/14.
 */
// Userlist data array for filling in info box
var celebrityListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the celebrity table on initial page load
    populateTable();
    // Celebrity link click
    $('#celebList table tbody').on('click', 'td a.linkshowceleb', showCelebrityInfo);
    // Delete Celebrity link click
    $('#celebList table tbody').on('click', 'td a.linkdeleteceleb', deleteCelebrity);


});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/celebrities/celebrities.json', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            // Stick our user data array into a userlist variable in the global object
            celebrityListData = data;
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowceleb" rel="' + this._id + '" title="Show Details">' + this.first_name + ' ' + this.last_name + '</td>';
            tableContent += '<td>' + this.birthdate + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteceleb" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#celebList table tbody').html(tableContent);
    });
};

// Show Celebrity Info
function showCelebrityInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve id from link rel attribute
    var thisCelebId = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = celebrityListData.map(function(arrayItem) { return arrayItem._id; }).indexOf(thisCelebId);

    // Get our User Object
    var thisCelebrityObject = celebrityListData[arrayPosition];

    //Populate Info Box
    $('#celebrityInfoFirstName').text(thisCelebrityObject.first_name);
    $('#celebrityInfoLastName').text(thisCelebrityObject.last_name);
    $('#celebrityInfoBirthdate').text(thisCelebrityObject.birthdate);
};
// Delete Celebrity
function deleteCelebrity(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this celebrity?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/celebrities/deletecelebrity/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};
