function createNewProject() {
  document.getElementById("overlay").style.visibility = "visible";
}

function close() {
  document.getElementById("overlay").style.visibility = "hidden";
  document.getElementById("user").style.visibility = "hidden";
}

function notFound() {
  document.getElementById("overlay_not_found").style.visibility = "visible";
  setTimeout(function windowReload() {
    window.location.reload();;
  }, 1000);
}




let id = 13547;
let user_id = 1234;

class User {
  constructor(user_name, company_name) {
    this.user_name = user_name;
    this.company_name = company_name;
    this.user_id = user_id;
  }
}

//project class: represents a project (project)
class Project {
  constructor(project_name, country_name, description) {
    this.project_name = project_name;
    this.country_name = country_name;
    this.description = description;
    this.id = id;
  }
}

// class User {

// }

// card class :handles Ui (ui)

class UI {
  static displayProjects() {

    const projects = Store.getProjects();

    projects.forEach((project) => UI.addProjectToCards(project));

  }

  static addProjectToCards(project) {

    const listing = document.querySelector('body > div > div.sidebar_content > div.sidebar > div.menu_sidebar > div.menu_projects');
    const element = document.createElement('div');

    element.innerHTML = `
    <div class="menu_item_name">
                        <div class="heading">
                            <h4> <span class="dot"></span>${project.project_name}</h4>
                            <p>${project.country_name}</p>
                        </div>
                        <div class="forward_arrow">
                            <img src="./assets/forward.PNG">
                        </div>
                    </div>
    `
    listing.appendChild(element);

    const cards_main = document.querySelector('body > div > div.main-content > div.body_content > div > div.current_project_card > div > div')

    const cards = document.createElement('div');
    cards.classList.add('project_card')

    cards.innerHTML = `<div class="project_card clickable">
    <img class="trash" src="./assets/trash.svg" width="50" height="50">
    <div class="project_card_body">
        <h4 class="recent_heading blue_text pb-20">
        ${project.project_name}
        </h4>
        <p class=" gray-text pb-20">${project.country_name}</p>
        <div class="badges">
            <div class="step_1">
                <span class="step badge_1">0</span>
                <p class="badge_label font-weight-500 ">Completed</p>
            </div>
            <div class="step_2">
                <span class="step badge_2">0</span>
                <p class="font-weight-500 badge_label ">In Progress</p>
            </div>
            <div class="step_3">
                <span class="step badge_3">0</span>
                <p class="font-weight-500 badge_label ">To Do</p>
            </div>
        </div>
    </div>
    <div class="gradient">
    </div>
</div>`;

    cards_main.appendChild(cards);

  }

  static deleteProject(el) {
    if (el.classList.contains('trash')) {
      el.parentElement.parentElement.remove();
      window.location.reload();
    }
  }



  static clearFields() {
    document.getElementById('country').value = '';
    document.getElementById('pname').value = '';
    document.getElementById('subject').value = '';
  }
}

//store class : handles store

class Store {

  
  static getProjects() {
    let projects;


    if (localStorage.getItem('projects') === null) {
      projects = [];

    } else {
      projects = JSON.parse(localStorage.getItem('projects'));
    }
    return projects;
  }

  static getUser() {
    let user_details;

    if (localStorage.getItem('user_details') === null) {
      user_details = [];

    } else {
      user_details = JSON.parse(localStorage.getItem('user_details'));
    }
    return user_details;
  }


  static addUser(user) {
    const user_details = Store.getUser();
    user_details.push(user);
    console.log(user_details);
    localStorage.setItem('user_details', JSON.stringify(user_details));
    console.log(user_details);
  }

  static addProject(project) {
    const projects = Store.getProjects();
    
    projects.push(project);
 
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static removeProject(id) {
    const projects = Store.getProjects();

    projects.forEach((id, index) => {
      if (id === id) {
        projects.splice(index, 1);
      }
    });

    localStorage.setItem('projects', JSON.stringify(projects));
  }
}

//event to display project
document.addEventListener('DOMContentLoaded', function user_available() {
  if(localStorage.getItem('user_details') === null) {
    document.getElementById("user").style.visibility = "visible";
  } else {
    document.getElementById("user").style.visibility = "hidden";
  }
} );

//event to add user 
document.querySelector('#user_form').addEventListener('submit', (e) => {
  e.preventDefault();

  const user_name = document.getElementById('user-name').value;
  const company_name = document.getElementById('company-name').value;

  if (user_name === '' || company_name === '') {

    alert('Please fill the required fields')
  }
  else {
    alert('Form is submitted')
  };

  const user = new User(user_name, company_name, user_id);

  Store.addUser(user);

  close();

  user_id = user_id + 1;

})

//event to add project
document.querySelector('#project_form').addEventListener('submit', (e) => {

  e.preventDefault();


  const country_name = document.getElementById('country').value
  const project_name = document.getElementById('pname').value;
  const description = document.getElementById('subject').value

  //validate

  if (country_name === '' || project_name === '') {

    alert('Please fill the required fields')
  }
  else if (description === '') {
    description.value = null;
    alert('Form is submitted')

  } else {
    alert('Form is submitted')
  };

  const project = new Project(project_name, country_name, id);

  UI.addProjectToCards(project);

  Store.addProject(project);

  UI.clearFields();

  close();

  id = id + 1;


});
//event to remove
document.querySelector('#project_card_main').addEventListener('click', (e) => {

  UI.deleteProject(e.target);

  Store.removeProject(e.target.parentElement);

  alert('project is deleted');
});


//close call

document.getElementById("close").addEventListener('click', (e) => {

  document.getElementById("overlay").style.visibility = "hidden";
  e.stopPropagation();
})








