package main

import (
	"fmt"
	"strconv"
	"strings"
)

func split(input string) (numbers []string, operators []string) {
	arrays := strings.Split(input, "")
	var sb strings.Builder
	for _, val := range arrays {
		if _, err := strconv.Atoi(val); err == nil {
			sb.WriteString(val)
		} else {
			operators = append(operators, val)
			numbers = append(numbers, sb.String())
			sb.Reset()
		}
	}
	if sb.Len() > 0 {
		numbers = append(numbers, sb.String())
	}
	return
}

func calculate(operatorRule string, numbers []string, operators []string) (newNumbers []string, newOperators []string) {
	newNumbers = numbers[:]
	var count int
	for i, operator := range operators {
		if operatorRule != operator {
			newOperators = append(newOperators, operator)
			continue
		}
		idx := i - count
		num1, _ := strconv.Atoi(numbers[idx])
		num2, _ := strconv.Atoi(numbers[idx+1])
		var result int
		switch operators[i] {
		case "+":
			result = num1 + num2
		case "-":
			result = num1 - num2
		case "*":
			result = num1 * num2
		case "/":
			result = num1 / num2
		}
		newNumbers = append(newNumbers[:idx], newNumbers[idx+1:]...)
		count += 1
		newNumbers[idx] = strconv.Itoa(result)
		fmt.Printf("	newNumbers[%s]: %v\n", operatorRule, newNumbers)
	}
	fmt.Printf("newNumbers[%s]: %v\n", operatorRule, newNumbers)
	fmt.Printf("newOperators[%s]: %v\n", operatorRule, newOperators)
	return
}

func main() {
	input := "1+4/2*4"
	numbers, operators := split(input)

	fmt.Printf("numbers:%v, operators:%v\n", numbers, operators)

	var result int
	newNumbers, newOperators := calculate("/", numbers, operators)
	newNumbers2, newOperators2 := calculate("*", newNumbers, newOperators)
	newNumbers3, newOperators3 := calculate("-", newNumbers2, newOperators2)
	newNumbers4, _ := calculate("+", newNumbers3, newOperators3)
	result, _ = strconv.Atoi(newNumbers4[0])
	fmt.Printf("result: %v\n", result)
}
