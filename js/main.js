/*  
	TimeLaps App
	Author: Julie Veal
*/

(function($) {
		
/*===================== login=====================*/	
	
$('#signinButton').click(function(){
	var user = $('#user').val();
	var pass = $('#pass').val();
	console.log("This notifies you if the password is working");
	$.ajax({
	url:'xhr/login.php',
	type: 'post',
	dataType: 'json',
	data:{
		username:user,
		password: pass
		},
		success:function(response){
			console.log("Test User");
			if (response.error) {
				alert(response.error);
				}else{
					window.location.assign('dashboard.html')
				};
			}
	});
});
/*===================== logout=====================*/
$('#logOut').click(function(e){
	e.preventDefault;
	$.get('xhr/logout.php', function(){
		window.location.assign('index.html')
	})
});

	
/*===================== register=====================*/		
$('#register').on('click', function(){
	var firstname= $('#first').val(),
	lastname= $('#last').val(),
	username= $('#userName').val(),
	email= $('#email').val(),
	password= $('#password').val();
	console.log(firstname+' '+lastname+' '+username+' '+email+' '+password);
	
	$.ajax({
		url:'xhr/register.php',
		type: 'post',
		dataType: 'json',
		data: {
			firstname: firstname,
			lastname: lastname,
			username: username,
			email: email,
			password: password
			},
			
			success: function(response){
				if (response.error){
					alert(response.error);
				}else{
					window.location.assign('dashboard.html');
					}
			}
		});
	});
/*===================== dynamic buttons=====================*/		
	$('.meetsbtn').on('click', function(e) {
		e.preventDefault();
		window.location.assign('projects.html');
	});
	$('.timesbtn').on('click', function(e) {
		e.preventDefault();
		window.location.assign('times.html');
	});
	$('.swimmersbtn').on('click', function(e) {
		e.preventDefault();
		window.location.assign('swimmers.html');
	});
	$('.dashboard').on('click', function(e) {
		e.preventDefault();
		window.location.assign('dashboard.html');
	});
	$('#regButton').on('click', function(e) {
		e.preventDefault();
		window.location.assign('register.html');
	});
	$('#cancelButton').on('click', function(e) {
		e.preventDefault();
		window.location.assign('index.html');
	});
	$('terms').on('click', function(e) {
		e.preventDefault();
		window.location.assign('terms.html');
	});
	$('#backToRegister').on('click', function(e) {
		e.preventDefault();
		window.location.assign('register.html');
	});
/*===================== tooltip=====================*/		
$('.masterTooltip').hover(function(){
	//Hover over code
	var title = $(this).attr('title');
	$(this).data('tipText', title).removeAttr('title');
	$('<p class="tooltip"></p>')
	.text(title).appendTo('body')
	.fadeIn('slow');
}, function(){
	//Hover out code
	$(this).attr('title', $(this).data('tipText'));
	$('.tooltip').remove();
}).mousemove(function(e){
	var mousex = e.pageX + 20; //Get x coordinates
	var mousey = e.pageY + 10; //Get Y coordinates
	$('.tooltip')
	.css({top:mousey, left:mousex})
	});					
	
	
/*===================== MODAL=====================*/		

	$('.modalClick').on('click', function(event){
		event.preventDefault();
		$('#overlay')	
			.fadeIn()
			.find('#modal')
			.fadeIn();
	});
	
	$('.close').on('click', function(event){
		event.preventDefault();
		$('#overlay')
			.fadeOut()
			.find('#modal')
			.fadeOut();
	});


/*===================== fading status option=====================*/		
	$('.mystatus').mouseover(function(){
		$(this).fadeTo(100, .3);
	});	
	$('.mystatus').mouseout(function(){
		$(this).fadeTo(100, 1);
	});	


/*===================== Tabbed accordian=====================*/		
	$('#tabs p').hide().eq(0).show();
	$('#tabs p:not(:first)').hide();
	
	$('#tabs-nav li').click(function(e) {
		e.preventDefault();
		$('#tabs p').hide();
		
	$('#tabs-nav .current').removeClass("current");
		$(this).addClass('current');
		var clicked = $(this).find('a:first').attr('href');
		
		$('#tabs ' + clicked).fadeIn('fast');
		}).eq(0).addClass('current');

/*===================== Display username=====================*/	

$.getJSON("xhr/check_login.php", function(data){
		console.log(data);
		$.each(data, function(key, val){
			console.log(val.first_name);
			$(".userid").html("Welcome User: " + val.first_name);
		})
});

/*===================== New meets=====================*/	
$('#addButton').on('click', function() {
	
		var projName = $('#projectName').val(),
		projDesc = $('#projectDescription').val(),
		projDue = $('#projectDueDate').val(), 
		status = $('input[name = "status"]:checked').prop("id");
		
		$.ajax({
		url:"xhr/new_project.php",
		type: "post",
		dataType: "json",
		data: {
			projectName: projName,
			projectDescription: projDesc,
			dueDate: projDue,
			status: status
			},
			
			success: function(response) {
				console.log('Testing for success');
				
				if (response.error) {
					alert(response.error);
				} else {
					window.location.assign("projects.html");
					};
				}
		});
});

	
/*===================== get meets=====================*/	
var projects = function(){
	$.ajax({
		url: 'xhr/get_projects.php',
		type: 'get',
		dataType: 'json',
		success: function(response){
			if(response.error){
				console.log(response.error);
			}else{
				
				for(var i=0, j=response.projects.length; i < j; i++){
					var result = response.projects[i];
					
					$(".projects").append(
					'<div style="border:1px solid black">' +
					'<div id="sortable" >' +
					" <input class='projectid' type='hidden' value='" + result.id + "'>" + 
					"<br>" + "Meet Name: " + result.projectName + "<br>" +
					"Meet Description: " + result.projectDescription + "<br>" +
					//should something change in here?
					"Meet Date: " + result.dueDate + "<br>" + 
					"Status: " + result.status + "<br>" + 
					'<button class="deletebtn">Delete</button>'
					+ '<button class="editbtn">Edit</button>'
					+ '</div> <br>'
					);
				}


/*===================== New times=====================	
$('#addButton').on('click', function() {
	
		var projMeet = $('#projectMeet').val(),
		projRelay = $('#projectRelay').val(),
		projTimee = $('#projectTime').val(), 
		status = $('input[name = "status"]:checked').prop("id");
		
		$.ajax({
		url:"xhr/new_project.php",
		type: "post",
		dataType: "json",
		data: {
			projectMeet: projMeet,
			projectRelay: projRelay,
			projectTime: projTime,
			status: status
			},
			
			success: function(response) {
				console.log('Testing for success');
				
				if (response.error) {
					alert(response.error);
				} else {
					window.location.assign("times.html");
					};
				}
		});
});
	
/*===================== get time=====================
var times = function(){
	$.ajax({
		url: 'xhr/get_projects.php',
		type: 'get',
		dataType: 'json',
		success: function(response){
			if(response.error){
				console.log(response.error);
			}else{
				
				for(var i=0, j=response.times.length; i < j; i++){
					var result = response.times[i];
					
					$(".times").append(
					'<div style="border:1px solid black">' +
					" <input class='timesid' type='hidden' value='" + result.id + "'>" +
					" Meet: " + result.projectMeet + "<br>" +
					" Relay: " + result.projectRelay + "<br>" +
					"Time: " + result.projectTime + "<br>" + 
					'<button class="deletebtn">Delete</button>'
					+ '<button class="editbtn">Edit</button>'
					+ '</div> <br>'
					);
				}
/*===================== New schedule=====================	
$('#addButton').on('click', function() {
	
		var projName = $('#projectName').val(),
		projDesc = $('#projectDescription').val(),
		projDue = $('#projectDueDate').val(), 
		status = $('input[name = "status"]:checked').prop("id");
		
		$.ajax({
		url:"xhr/new_project.php",
		type: "post",
		dataType: "json",
		data: {
			projectName: projName,
			projectDescription: projDesc,
			projectDueDate: projDue,
			status: status
			},
			
			success: function(response) {
				console.log('Testing for success');
				
				if (response.error) {
					alert(response.error);
				} else {
					window.location.assign("projects.html");
					};
				}
		});
});
	
/*===================== get schedule=====================	
var projects = function(){
	$.ajax({
		url: 'xhr/get_projects.php',
		type: 'get',
		dataType: 'json',
		success: function(response){
			if(response.error){
				console.log(response.error);
			}else{
				
				for(var i=0, j=response.projects.length; i < j; i++){
					var result = response.projects[i];
					
					$(".projects").append(
					'<div style="border:1px solid black">' +
					" <input class='projectid' type='hidden' value='" + result.id + "'>" +
					" Meet Name: " + result.projectName + "<br>" +
					" Meet Description: " + result.projectDescription + "<br>" +
					"Meet Status: " + result.status + "<br>" + 
					'<button class="deletebtn">Delete</button>'
					+ '<button class="editbtn">Edit</button>'
					+ '</div> <br>'
					);
				}
/*===================== delete button=====================*/

				$('.deletebtn').on('click', function(e){
					var pid = $(this).parent().find(".projectid").val();
					console.log('test delete');
					$.ajax({
						url: 'xhr/delete_project.php',
						data: {
							projectID: pid
						},
						type: 'POST',
						dataType:'json',
						success: function(response){
							console.log('Testing for success');
							
							if(response.error){
								alert(response.error);
							}else{
							//console.log(response.error);
							window.location.assign("projects.html");
							};
						}
					});
				});//End Delete
				
/*===================== edit button =====================*/			


				$('.editbtn').on('click', function(e){
					var pid = $(this).parent().find(".projectid").val();
					console.log('test edit');
					$.ajax({
						url: 'xhr/update_project.php',
						data: {
							projectID: pid
						},
						type: 'POST',
						dataType:'json',
						success: function(response){
							console.log('Testing for success');
							
							if(response.error){
								alert(response.error);
							}else{
							//console.log(response.error);
							window.location.assign("projects.html");
							};
						}
					});
				});//End edit
				

	


			}
		}
	})
}

projects();

/*===================== date picker=====================*/	

$( ".mydatepicker").datepicker();

/*===================== sortable=====================*/	

$( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();

		
})(jQuery); // end private scope




