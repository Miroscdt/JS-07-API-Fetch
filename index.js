let table = document.getElementById("tBody");

function buscarUsuarios() {
  console.log("Users search button was activated");
  table.innerHTML = ""; 

  const users = JSON.parse( localStorage.getItem("users"));

  if (users && users.time > Date.now()) {
    pintarTabla(users.data);
  } else {
    table.innerHTML = `
      <tr>
          <td colspan="100%" class="text-center">
              <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
              </div>
          </td>
       </tr>
         `;

    fetch(`https://reqres.in/api/users?delay=3`) 
      .then((response) => response.json())
      .then((users) => {
        const usersData = {
          data: users.data,
          time: Date.now() + 60000,
        };
        table.innerHTML = "";

        localStorage.setItem("users", JSON.stringify(usersData));
        pintarTabla(users.data);
      });
  }
}

function pintarTabla(usuarios) {
  for (let i = 0; i < usuarios.length; i++) {
    table.innerHTML += `  
          <tr>
          <td>${usuarios[i].id}</td>
          <td>${usuarios[i].first_name}</td>
          <td>${usuarios[i].last_name}</td>
          <td>${usuarios[i].email}</td>
          <!--bootstrap-->
          <td><img src="${usuarios[i].avatar}" class="rounded-circle" style="width=50px" alt="Eniun"></td>
        </tr> `;
  }
}
