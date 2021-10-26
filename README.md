# Develop a front end for Just Stream It!

This is the front end of the website for Just Stream It!

<p align="center">
  <img width="460" height="300" src="https://user.oc-static.com/upload/2020/09/18/16004298163529_P5.png">
</p>

## Installation

Download the repository and extract in your web server folder.
```bash
git clone https://github.com/Danycm1/P6_Just_stream_it.git
you can also download the code using as a zip file https://github.com/Danycm1/P6_Just_stream_it/archive/refs/heads/master.zip
```

Pipenv is recommended if you do not have it, install it or see option 2.
```bash
# Install pipenv

pip install pipenv

## Option 1: Using pipenv

```bash
1. Clone this repository using 
git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
you can also download the code using as a zip file https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/archive/refs/heads/master.zip)

2. Move to the ocmovies-api root folder with cd ocmovies-api-en

3. Install project dependencies with pipenv install 

4. Create and populate project database with pipenv run python manage.py create_db

5. Run the server with pipenv run python manage.py runserver

When the server is running after step 5 of the procedure, the OCMovies API can
be requested from endpoints starting with the following base URL:
http://localhost:8000/api/v1/
http://localhost:8000/api/v1/titles/

Steps 1-4 are only required for initial installation. For subsequent launches
of the API, you only have to execute step 5 from the root folder of the project.
```

## Option 2: Installation and execution without pipenv (using venv and pip)

```bash
1. Clone this repository using 
git clone clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
(you can also download the code using as a zip file
https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/archive/refs/heads/master.zip

2. Move to the ocmovies-api root folder with cd ocmovies-api-en

3. Create a virtual environment for the project with py -m venv env on windows or python3 -m venv env on macos or linux.

4. Activate the virtual environment with env\Scripts\activate on windows or source env/bin/activate on macos or linux.

5. Install project dependencies with pip install -r requirements.txt

6. Create and populate the project database with python manage.py create_db

7. Run the server with python manage.py runserver

When the server is running after step 7 of the procedure, the OCMovies API can be requested from endpoints starting with the following base URL: 
http://localhost:8000/api/v1/titles/.

Steps 1-3 and 5-6 are only required for initial installation. For subsequent launches of the API, you only have to execute steps 4 and 7 from the root folder of the project.
```

## Usage

Extract the repository in your web server folder and you should see the website.


## License
[MIT](https://github.com/Danycm1)