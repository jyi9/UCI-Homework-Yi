-- Data Engineering

CREATE TABLE Employees (
    emp_no INT   NOT NULL,
    emp_title_id VARCHAR(10)   NOT NULL,
    birth_date DATE   NOT NULL,
    first_name VARCHAR(20)   NOT NULL,
    last_name VARCHAR(20)   NOT NULL,
    sex VARCHAR(10)   NOT NULL,
    hire_date DATE   NOT NULL,
    CONSTRAINT pk_Employees PRIMARY KEY (
        emp_no
     )
);

CREATE TABLE Departments (
    dept_no VARCHAR(10)   NOT NULL,
    dept_name VARCHAR(30)   NOT NULL,
    CONSTRAINT pk_Departments PRIMARY KEY (
        dept_no
     )
);

CREATE TABLE Dept_emp (
    emp_no INT   NOT NULL,
    dept_no VARCHAR(30)   NOT NULL
);

CREATE TABLE Dept_manager (
    dept_no VARCHAR(10)   NOT NULL,
    emp_no INT   NOT NULL
);



CREATE TABLE Salaries (
    emp_no INT   NOT NULL,
    salary INT   NOT NULL
);

CREATE TABLE Titles (
    emp_title_id VARCHAR(10)   NOT NULL,
    title VARCHAR   NOT NULL,
    CONSTRAINT pk_Titles PRIMARY KEY (
        emp_title_id
     )
);

ALTER TABLE Employees ADD CONSTRAINT fk_Employees_emp_title_id FOREIGN KEY(emp_title_id)
REFERENCES Titles (emp_title_id);

ALTER TABLE Dept_emp ADD CONSTRAINT fk_Dept_emp_emp_no FOREIGN KEY(emp_no)
REFERENCES Employees (emp_no);

ALTER TABLE Dept_manager ADD CONSTRAINT fk_Dept_manager_dept_no FOREIGN KEY(dept_no)
REFERENCES Departments (dept_no);

ALTER TABLE Dept_manager ADD CONSTRAINT fk_Dept_manager_emp_no FOREIGN KEY(emp_no)
REFERENCES Employees (emp_no);

ALTER TABLE Salaries ADD CONSTRAINT fk_Salaries_emp_no FOREIGN KEY(emp_no)
REFERENCES Employees (emp_no);