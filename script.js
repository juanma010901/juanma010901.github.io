// Traer información de API Pública de GitHub

fetch("https://api.github.com/users/juanma010901/repos")
  .then(response => response.json())
  .then(data => {
    // Ordena la lista de repositorios por fecha de actualización para que los más recientes aparezcan primero
    data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    // Filtra la lista para obtener solo los últimos 4 repositorios
    const ultimosRepos = data.slice(0, 6);
    // Por cada repositorio en la lista, crea una tarjeta HTML para mostrar la información que deseas mostrar
    const repositoriosContainer = document.querySelector(".repositorios-container");

    ultimosRepos.forEach(repo => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("repositorio-tarjeta");
        tarjeta.innerHTML = `
            <h2 class="repositorio-titulo">${repo.name}</h2>
            <p class="repositorio-descripcion">${repo.description}</p>
            <p class="repositorio-lenguaje">Lenguaje Principal: ${repo.language}</p>
        `;

         // Contenedor de iconos
        const enlaces = document.createElement("div");
        
        const enlaceRepo = document.createElement("a");
        enlaceRepo.target = "_blank"
        enlaceRepo.href = repo.html_url;

        // Crea la imagen
        const img = document.createElement("img");
        img.id = "github-repo";
        img.src = "assets/tools/github.svg";
        img.alt = "GitHub";

        // Agrega la imagen al enlace
        enlaceRepo.appendChild(img);

        // Agregar los enlaces
        enlaces.appendChild(enlaceRepo);

        if (repo.homepage) {
            const enlaceDeploy = document.createElement("a");
            enlaceDeploy.target = "_blank"
            enlaceDeploy.href = repo.homepage;

            const despliegue = document.createElement("img");
            despliegue.id = "github-repos";
            despliegue.src = "assets/tools/deploy.svg";
            despliegue.alt = "GitHub";

            enlaceDeploy.appendChild(despliegue);
            enlaces.appendChild(enlaceDeploy);
        }
        
        // Agrega el enlace a la tarjeta
        tarjeta.appendChild(enlaces);

        // Agregar la tarjeta al contenedor de tarjetas
        repositoriosContainer.appendChild(tarjeta);
    });
})
.catch(error => console.error(error));