
$(document).ready(function () {

    // Toggle Hamburger Menu

    $('#hamburgerMenuButton, #projectsNavItem, #homeNavItem, #aboutNavItem, #contactNavItem').on('click', function () {
        $('#hamburgerLines').toggleClass('menuOpen');
        $('#line1').toggleClass('menuOpen');
        $('#line2').toggleClass('menuOpen');
        $('#line3').toggleClass('menuOpen');
        $("#menuOverlayContainer").toggleClass("menuOpen");

        if ($("#menuOverlayContainer").hasClass('menuOpen')) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    });


    // Ghost Type Plugin Stuff
    $(".designer").ghosttyper({
        messages: ['developer', 'Designer', 'creator'],
        timeWrite: 90,  //time between displaying each chracter
        timeDelete: 70, //time between removing(backspace) each chracter
        timePause: 3000, //waiting time after displaying text
        repeat: true,  //loop it indefinitely
    });

    // Scroll to elements
   
    // arrow and projects menu item goes to projects
    $(".enjoy-wrapper").click(function () {
        $('html, body').animate({
            scrollTop: $("#projectGridContainer").offset().top - 60
        }, 600);
    });

    $("#deskProjectsNavItem").click(function () {
        $('html, body').animate({
            scrollTop: $("#projectGridContainer").offset().top - 60
        }, 600);
    });
    
    $("#projectsNavItem").click(function () {
        $('html, body').animate({
            scrollTop: $("#projectGridContainer").offset().top - 60
        }, 600);
    });
    
    // Logo and home menu Item scrolls to top of page
    $("#navLogoImg").click(function () {
        $("html, body").animate({
            scrollTop: $("html, body").offset().top
        }, 500);
    });
    $("#deskHomeNavItem").click(function () {
        $("html, body").animate({
            scrollTop: $("html, body").offset().top
        }, 500);
    });
    $("#homeNavItem").click(function () {
        $("html, body").animate({
            scrollTop: $("html, body").offset().top
        }, 500);
    });

    // contact and about menu Item scrolls to top of section
    // About
    $("#aboutNavItem").click(function () {
        $('html, body').animate({
            scrollTop: $(".aboutMe_container").offset().top - 60
        }, 600);
    });
    $("#deskAboutNavItem").click(function () {
        $('html, body').animate({
            scrollTop: $(".aboutMe_container").offset().top - 60
        }, 600);
    });

    // Contact
    $("#contactNavItem").click(function () {
        $('html, body').animate({
            scrollTop: $(".contactMe_container").offset().top - 60
        }, 600);
    });
    $("#deskContactNavItem").click(function () {
        $('html, body').animate({
            scrollTop: $(".contactMe_container").offset().top - 60
        }, 600);
    });



    // Slick JS Project Modal Slider
    $('.slider').slick({
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        draggable: true,
        autoplay: true,
        autoplaySpeed: 5000,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        swipe: true,
        swipeToSlide: true,
    });


});




// Flip animation for about
function flipAbout() {
    document.getElementById('flipButton').classList.toggle("clicked");
}

$('#flipButton, #flipBack').on('click', function () {
    $('.flipBtnWrapper').toggleClass('flipped');
    $('.flipBtn').toggleClass('clicked');
});



// PROGJECT GRID CUSTOM JS----------------------------------------------------

// Loop to append project grid html elementss
var myProjectsData = myProjects.projects;

for (var p = myProjectsData.length-1; -1 < p; p--) {
    var string = '<div class="project-grid" id="' + myProjectsData[p].unique_id + '"><img class="gridImg" src = "' + myProjectsData[p].project_icon + '" alt = "' + myProjectsData[p].name + '" /><div class="project_hoverDescription"><h3>' + myProjectsData[p].name + '</h3><p>' + myProjectsData[p].work_type + '</p></div ></div>';
    document.getElementById('projectGridWrapper').insertAdjacentHTML('afterbegin', string);
}

// Show and Hide Project Modal when project is clicked and show data
var project = document.getElementsByClassName('project-grid');
var projectCloseBtn = document.getElementById('closeProjectButtonWrapper');

var projectIds = [];

$(".project-grid").click(function () {
    showProjectModal();
    var gridId = this.getAttribute('id');
    projectIds.splice(0, 1);
    projectIds.push(gridId);
    displayData();
});


// show and hide project modal function
projectCloseBtn.addEventListener('click', hideProjectModal, false);

function showProjectModal () {
    document.getElementById('projectModalContainer').style.display = "flex";
}
function hideProjectModal() {
    $(".vistSiteContainer").empty();
    $("#projectCollaboratorsWrapper").empty();
    document.getElementById('projectModalContainer').style.display = "none";
}

// Display Data in project modal
function displayData(){
    
    var projectContent = projectIds[0];
    var object;

    for (var project = myProjectsData.length-1; -1 < project; project--) {
        switch (projectContent) {
            case myProjectsData[project].unique_id:
                object = myProjectsData[project].id;
                break;
        }
    }

    var mobile__projectName = document.getElementById('mobile_projectName');
    mobile__projectName.textContent = myProjects.projects[object].name;
    var desk__projectName = document.getElementById('desk_projectName');
    desk__projectName.textContent = myProjects.projects[object].name;

    var mobile__workType = document.getElementById('mobile_workType');
    mobile__workType.textContent = myProjects.projects[object].work_type;
    var desk__workType = document.getElementById('desk_workType');
    desk__workType.textContent = myProjects.projects[object].work_type;

    var projectDescription = document.getElementById('projectDescription');
    projectDescription.textContent = myProjects.projects[object].description;

    
    
    checkProject = myProjects.projects[object];

    // If project object has live_site property 
    if (checkProject.hasOwnProperty('live_site')){        
        $('<div class="vistSiteWrapper"><a id = "vistSiteBtn" href = "#" target = "_blank" > Visit Site</a></div>').appendTo('.vistSiteContainer');
        var siteLink = document.getElementById('vistSiteBtn');
        siteLink.href = myProjects.projects[object].live_site;
    }


    // If project object has collaborators property 
    if (checkProject.hasOwnProperty('collaborators')) {
        var collabTitle = '<h3>Collaborators:</h3>';
        document.getElementById('projectCollaboratorsWrapper').insertAdjacentHTML('afterBegin', collabTitle);

        var collaboratorsArray = checkProject.collaborators;
        for (var c = 0; c < collaboratorsArray.length; c++) {
            var collabDiv = '<a href="' + collaboratorsArray[c].collab_link + '" class="collaborator_link" target="_blank"><div class="collaborator"><div class="collaborator_img"><img src="' + collaboratorsArray[c].collab_image + '" alt ="' + collaboratorsArray[c].collab_name + '" /></div><div class="collaborator_info"><h5> ' + collaboratorsArray[c].collab_name + '<i class="fas fa-external-link-alt"></i><h5></div></div></a>';
            document.getElementById('projectCollaboratorsWrapper').insertAdjacentHTML('beforeend', collabDiv);
        }
    }




    // If project object has videos property and Image
    if ((checkProject.hasOwnProperty('videos')) && (checkProject.hasOwnProperty('imgs'))) {
        // Looping through project object array for imgs
        var projectImgs = myProjects.projects[object].imgs;

        makeVideoSliderDiv(projectImgs.length);
        for (var a = 0; a < projectImgs.length; a++) {
            makeVideoSliderImgDiv(projectImgs[a], projectImgs.length);
        }

    } else if ((checkProject.hasOwnProperty('imgs')) && (!checkProject.hasOwnProperty('videos'))) {
        makeImgDiv();
    }


    // Functions To add video and image slick divs
    function makeVideoSliderImgDiv(img, amountOfSlides) {
        $(document).ready(function () {
            $('.slider').slick('slickAdd', '<div><div class="sliderImgWrapper"><img id="sliderImg" src="' + img + '" alt="sliderImg"/></div></div>');
        });
    }
    function makeVideoSliderDiv(amountOfSlides){
        var siteVideo = myProjects.projects[object].videos;
        var projectImgs = myProjects.projects[object].imgs[0];
        amountOfSlides++;
        $(document).ready(function () {

            $('.slider').slick('slickAdd', '<div><div class="sliderVideoContainer"><video class="slideVideoWrapper" poster="' + myProjects.projects[object].video_poster +'" controls><source id="sliderVideo" src = "' + siteVideo + '" type = "video/mp4"></video></div></div>');

            $('#closeProjectButtonWrapper').on('click', function () {
                $('.slider').slick('removeSlide', null, null, true);
                $('.slider').slick('refresh');
            });
        });
    }


    // Functions To add image slick divs
    function makeImgDiv(){
        // Looping through project object array for imgs
        var projectImgs = myProjects.projects[object].imgs;
        for (var b = 0; b < projectImgs.length; b++) {
            makeSliderDivs(projectImgs[b], projectImgs.length);
        }
    }
    
    // Adding slider divs
    function makeSliderDivs(img, amountOfSlides) {
        $(document).ready(function () {
           
            $('.slider').slick('slickAdd', '<div><div class="sliderImgWrapper"><img id="sliderImg" src="' + img + '" alt="sliderImg"/></div></div>');

            $('#closeProjectButtonWrapper').on('click', function () {
                $('.slider').slick('removeSlide', null, null, true);
                $('.slider').slick('refresh');
            });
        });
    }


}







