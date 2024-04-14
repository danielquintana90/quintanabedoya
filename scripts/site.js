const openSocial = (event, type) => {
    let url;

    let urlLinkedin = 'https://www.linkedin.com/in/danielquintanabedoya';
    let urlGithub = 'https://github.com/DanielQuintana90';
    let urlMedium = 'https://blog.quintanabedoya.com';

    switch (type) {
        case 'linkedin':
            url = urlLinkedin;
            break;
        case 'github':
            url = urlGithub;
            break;
        case 'medium':
            url = urlMedium;
            break;
    }

    window.open(url, '_blank');
};

const linkedin = document.querySelector('#linkedin');
const github = document.querySelector('#github');
const medium = document.querySelector('#medium');

linkedin.addEventListener('click', event => openSocial(event, 'linkedin'));
github.addEventListener('click', event => openSocial(event, 'github'));
medium.addEventListener('click', event => openSocial(event, 'medium'));