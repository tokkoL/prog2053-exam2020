import { LitElement, html, css } from "../../node_modules/lit-element/lit-element.js";

class EditUser extends LitElement {
  static get properties() {
    return {
      user: { type: Object }
    };
  }

  render() {
    return html`
    <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    </head>

    <form onsubmit="javascript: return false;" id="userInfo" method="POST">

    <div class="form-group">
      <div class="mb-3">
        <label for="username" class="form-label">Brukernavn</label>
        <input type="text" class="form-control" id="username" name="username" value="${this.user.uname}" required>
      </div>
      <div class="mb-3">
        <label for="firstname" class="form-label">Fornavn</label>
        <input type="text" class="form-control" id="firstname" name="firstname" value="${this.user.firstName}" required>
      </div>
      <div class="mb-3">
        <label for="lastname" class="form-label">Etternavn</label>
        <input type="text" class="form-control" id="lastname" name="lastname" value="${this.user.lastName}" required>
      </div>
      <div class="mb-3">
        <label for="oldPass" class="form-label">Gammel passord</label>
        <input type="password" class="form-control" id="oldPass" name="oldPass" value="${this.user.oldPwd}">
      </div>
      <div class="mb-3">
        <label for="newPass" class="form-label">Nytt passord</label>
        <input type="password" class="form-control" id="newPass" name="newPass" value="${this.user.pwd}">
      </div>
    </div>
      <input type="submit" @click=${this.updateInfo} id="submitForm" name="editUser" class="btn btn-success mt-4 ml-2" value="Oppdater info"></input>
    </form>
    `;
  }

  // Uses updateUser.php to update the users properties with the new data from the form
  updateInfo(f){

    // Calls to updateUser.php using POST-protocol
    // Creates a FormData from the html and sends it as the body
    fetch('api/updateUser.php', {
      method: 'POST',
      body: new FormData(f.target.form) 
    })
    .then(response=>response.json())
    .then(data=>{
      if(data.status == 'success'){
        console.log("The users information was updated.");
      }
      else if (data.status == 'fail'){
        console.log("The users information was not updated.");
      }
    })
  }
}

customElements.define('edit-user', EditUser);