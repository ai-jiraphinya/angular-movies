# Movies

Real live app with data and image API including the latest features of Angular and optimized for performance.
The app war created with ❤️ by the company [Push Based](push-based.io).

# Testing

## Components Tests

### Shell

The shell has the following sections:

- Sidebar
- Toolbar
- Content

### Sidebar

**📱 Mobile specific:**

- shrink
- open/close

### Dark mode toggle

- toggle dark mode

### Search Input

- show search bar
  - open/collapse search input on focus/blur
  - hide search only if empty

### Account menu

**🖥️ The element can:**

- open/close account menu
  - login state (list account menu options)
  - logout state (list guest menu options)

### Movie list

**🖥️ The element can:** - infinite scroll

### Movie card

**🖥️ The element can:** - show start - tooltip - rate click

## Features to test

#### About Page

**🖥️ The element can:**

- list contributors
- shows description
- backlink to movies app

### Navigation

**🖥️ The element can:**

- navigate to [Category list](#Category-list) (`popular`, `top_rated`, `upcoming`) over side menu
- navigate to [Genre list](#Genre-list) (list of numeric id's) over side menu
- navigate to [Movie detail](#Movie-detail) over recommended movies
- navigate to [Actor detail](#Genre-list) over cast list movies
- navigate to wrong path redirects to [Page not found](#Page-not-found)
- navigate to main page from [Page not found](#Page-not-found)

### Search Movies

**🖥️ The element can:**

- search a movie (like search)
  - list movie result
    - (TODO) find, filter, sort movies. Paginated
  - list NO movie result

### List Movies per Category

**🖥️ The page can:**

- list movie category result

### List Movies per Genre

**🖥️ The page can:**

- list movie genre result

### Show Recommended Movies per Category/Genre/Actor

**🖥️ The page can:**

- list movies
- sort movies

### Detail movie

**🖥️ The page can:**

- show hero image
- show description
- show links
- show actor list
- show recommended movies

### Detail actor

**🖥️ The page can:**

- show hero image
- show description
- show recommended movies

### Account Features

- login as user and see authed menu options
- logout as user ans see default menu options

### Account Features Navigations

- navigate to [My lists](#My-lists) over account menu
- navigate to [Lists detail](#List-detail) over my lists
- navigate to [Create list](#Create-list) over account menu

### Show my lists

**🖥️ The page can:**

- view all your saved lists

### Show list details

**🖥️ The page can:**

- show detail page

#### Edit list

**🖥️ The page can:**

- add/remove/edit lists

#### Create new list

**🖥️ The page can:**

- create new lists
- search movie and add to list
