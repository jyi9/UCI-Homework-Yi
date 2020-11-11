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

-- Data Analysis:

-- Display last name, first name, sex, and salary of employees
SELECT Employees.emp_no, Employees.last_name, Employees.first_name, Employees.sex, Salaries.salary
FROM Employees
JOIN Salaries
ON Employees.emp_no = Salaries.emp_no;

-- Employees hired in 1986
SELECT first_name, last_name, hire_date
FROM employees
WHERE DATE_PART('year', hire_date) = 1986

-- List the manager of each department with the following information: department number, department name, the manager's employee number, last name, first name.
SELECT departments.dept_no, departments.dept_name, dept_manager.emp_no, employees.last_name, employees.first_name
FROM departments 
JOIN dept_manager ON departments.dept_no = dept_manager.dept_no
JOIN employees ON dept_manager.emp_no = employees.emp_no;

-- List the department of each employee with the following information: employee number, last name, first name, and department name.
SELECT departments.dept_name, departments.dept_no, employees.emp_no, employees.last_name, employees.first_name
FROM departments
JOIN dept_emp ON dept_emp.dept_no = departments.dept_no 
JOIN employees ON dept_emp.emp_no = employees.emp_no;

-- List first name, last name, and sex for employees whose first name is "Hercules" and last names begin with "B."
SELECT first_name, last_name, sex
FROM employees
WHERE first_name = 'Hercules' AND last_name LIKE 'B%';

-- List all employees in the Sales department, including their employee number, last name, first name, and department name.
SELECT employees.emp_no, employees.last_name, employees.first_name, departments.dept_name 
FROM departments 
JOIN dept_emp ON dept_emp.dept_no = departments.dept_no
JOIN employees ON employees.emp_no = dept_emp.emp_no
WHERE departments.dept_name = 'Sales';

-- List all employees in the Sales and Development departments, including their employee number, last name, first name, and department name.
SELECT employees.emp_no, employees.last_name, employees.first_name, departments.dept_name 
FROM departments 
JOIN dept_emp ON dept_emp.dept_no = departments.dept_no
JOIN employees ON employees.emp_no = dept_emp.emp_no
WHERE departments.dept_name = 'Sales' OR departments.dept_name = 'Development';

-- In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.
SELECT last_name, COUNT(last_name) AS "frequency count"
FROM employees
GROUP BY last_name 
ORDER BY "frequency count" DESC;