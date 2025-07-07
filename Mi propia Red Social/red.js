//  import { Usuario } from "./clase/usuario"; 
 class Usuario {
    constructor(nombre, correo) {
        this.nombre = nombre;
        this.correo = correo;
    }

    mostrarInfo() {
        return `Nombre: ${this.nombre}, Correo: ${this.correo}`;
    }
}

const usuarioClass = new Usuario("carlos", "carlos@mail.com");

const obtenerDatos = async () => {
    try {
        const [usuariosRes, post, fotosNuevas] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users'),
            fetch('https://jsonplaceholder.typicode.com/photos?_limit=10'),
            fetch('https://jsonplaceholder.typicode.com/posts?_limit=5'),
            fetch('https://picsum.photos/v2/list?page=20&limit=10')
        ]);

        const [nombreUsuario] = await usuariosRes.json();
        const posts = await post.json();
        const nuevasFotos = await fotosNuevas.json();
        const imagenes = [];
        for (const element of nuevasFotos) {
            const { download_url } = element
            imagenes.push(download_url)
        }
        const [fotoPerfil] = imagenes

        const usuario = document.getElementById("nombre-usuario");
        const imagen = document.getElementById("foto-perfil");
        const contenedor = document.getElementById("album");
        const divPost = document.getElementById("div-post");
        usuario.textContent = usuarioClass.mostrarInfo();
        imagen.setAttribute("src", fotoPerfil)
        posts.forEach(element => {
            const p = document.createElement("p");
            const strong = document.createElement("strong");
            const p2 = document.createElement("p");
            strong.textContent = element.title
            p.appendChild(strong)
            p2.textContent = element.body;
            divPost.appendChild(p);
            divPost.appendChild(p2);
        })

        imagenes.forEach(url => {
            const img = document.createElement("img");
            img.src = url;
            img.alt = "Foto del álbum";
            contenedor.appendChild(img);
        });

    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
};

obtenerDatos();
