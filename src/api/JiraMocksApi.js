import users from './mocks/users'
import projects from './mocks/projects'

const answerDelay = 300;

function response(response) {
    return new Promise(resolve => setTimeout(() => resolve(response, answerDelay)));
}

export const isDev = true;

export const getProject = projectKeyOrId => response(projects.filter(project => project.id === projectKeyOrId)[0]);
export const getProjects = () => response(projects);

export const getUser = userKey => response(users.filter(user => user.key === userKey)[0]);
export const getUsers = userQuery => response(users.filter(user => queryMatchesUser(userQuery, user)));

function queryMatchesUser(query, user) {
    return user.key.toUpperCase().indexOf(query.toUpperCase()) >= 0
        || user.name.toUpperCase().indexOf(query.toUpperCase()) >= 0
        || user.displayName.toUpperCase().indexOf(query.toUpperCase()) >= 0
}
