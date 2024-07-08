# Journal-Frontend
This is the frontend side of the journal application in react native that is integrated with the [Journal-Backend](https://github.com/naim-2/Journal-Backend) repository to create a personal journaling mobile application. Users can write journal entries, categorize them, and view a summary of
their entries within the application. You can choose to run the backend together with the frontend or simply just the frontend because the backend is already hosted in render through this [link](https://journal-backend-4g3d.onrender.com). You can install the project as follows:

## Setting up and running the frontend
### 1. Installation
* Clone the repository:
#     
    git clone https://github.com/naim-2/Journal-Frontend
    cd Journal-Frontend
* Install the dependencies:
#
    npm install  
### 2. Running the application
* Run the following command to start the application:
#
    npm start
* Then follow the instructions to run the app on an emulator or a physical device.

### 3. Connecting the local backend to the frontend
* If you choose to use your own deployed backend instead of the hosted one, hover to src/api/index.ts file and change the variable in line 5 from 'PRODUCTION_URL' to 'LOCAL_URL'.
* Make sure the backend is running on port 3000.
