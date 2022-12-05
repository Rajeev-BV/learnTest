Given Age is <Age>
		And Salary is <Salary>
	When I call TaxCalculator function
	Then the result should be <Tax>
	Examples: 
	| Age | Salary | Tax   |
	| 45  | 200000 | 20000 |
	| 45  | 500000 | 50000 |