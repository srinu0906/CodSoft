function main(ch)
{
    var exp = document.getElementById('screen').innerHTML;
    var result;
    if (ch == '=')
    {
        result = solve(exp);
        document.getElementById("screen").innerHTML=result;
        if( document.getElementById("screen").innerHTML== 'NaN')
            document.getElementById("screen").innerHTML="ERROR";
    }
    else
    {
        
    if(ch == 'AC')
        exp ='';
    else if(ch == 'DEL')
    {
        if(document.getElementById("screen").innerHTML=="ERROR")
            exp = '';
        exp = exp.split('');
        exp.pop();
        exp = exp.join('');
    }
    else
    {
        if(ch == 'lp')
            ch = '(';
        else if (ch == 'rp')
            ch = ')';
        exp += ch;
        
    }
    document.getElementById("screen").innerHTML=exp;
    }
}
 

function solve(exp)
{
    var postfix ,val, map_array={},index =0 ;
    
    exp = clear_roots(exp);
    exp = filter_numbers(exp)
    postfix = infix_to_postfix(exp);
    val = solve_postfix(postfix,map_array);
    return val;


    function filter_numbers(exp1)
    {
        var number = '';
        var alpha = Array.from({length:26},(_,i) => String.fromCharCode('a'.charCodeAt(0)+i));
        const num = /[0-9.]/
        for(var ch of exp1)
        {
            if(ch.match(num))
            {
                number += ch; //storing consecutive digits of a number
            }
            else
            {
                if(number != '')
                {
                if(exp1.charAt(exp1.indexOf(number)-1) == '-' )
                    {
                        console.log('hi');
                        number = '-'+number;
                    }
                map_array[alpha[index]] = number;
                exp1 = exp1.replace(number,alpha[index]);
                index++;
                number = '';
                }
            }
        }
        //for last remaining number
        map_array[alpha[index]] = number;
        exp1 = exp1.replace(number,alpha[index]);
        index++;
        number = ''
        return exp1;
    }
}

function clear_roots(exp1)
{
    var sub_exp ='', root, number='';
    var result_exp = exp1;
    const digits = ['0','1','2','3','4','5','6','7','8','9','.'];
    var i = 0;
    exp1 = exp1.split('');
    while( i < exp1.length)
    {
        
        if (exp1[i] == '√')
        {
            i++;
            if (exp1[i] == '(')
            {
                while(exp1[i] != ')')
                {
                    sub_exp += exp1[i];
                    i++;
                }
                sub_exp += ')';
                root = parseFloat(solve(sub_exp))**0.5;
                result_exp = result_exp.replace('√'+sub_exp,root.toString());
                number = '';
            }
            else
            {
                while(exp1[i] in digits || exp1[i] == '.')
                {
                    number += exp1[i];
                    i++;
                }
                root = parseFloat(number)**0.5;
                result_exp = result_exp.replace('√'+number,root.toString());
                number = '';
            }
        }
        else{
        i++;
        }
    }
    return result_exp;
    
}

function infix_to_postfix(infix)
{
    var postfix ='';
    var stack =[],top=-1;
    const oprands = /[A-Za-z0-9]/;
    const operators = /[-+)%(/*]/;
    for(var ch of infix)
    {
        if (ch.match(oprands))
        {
            postfix += ch;
        }
        else if(ch.match(operators))
        {
            push(ch);
        }
    }
    while(top!= -1)
    {
        postfix += stack.pop();
        top--;
    }
    function push(c)
    {
        var temp;
        if(top == -1 || stack[top] == '(')
        {
            top++;
            stack[top]=c;
        }
        else
        {
            if(c == '(')
            {
                top++;
                stack[top] = c;
            }
            else if(getPriority(stack[top]) > getPriority(c))
            {
                top++;
                stack[top] = c;
            }

            else if(getPriority(stack[top]) <= getPriority(c))
            {
                top--;
                postfix += stack.pop();               
                push(c);
            }
            else if(c == ')')
            {
                while(stack[top] != '(')
                {
                    top--;
                    postfix += stack.pop();
                }
                top--;
                temp = stack.pop();
            }
        }
        function getPriority(char)
        {
            if(char == '%' || char =='*' || char =='/' )
                return 1;
            else if(char == '+' || char == '-')
                return 2;
        }
        
    }
    return postfix;
}

function solve_postfix(postfix,map_array)
{
    var stack =[],op1,op2,result;
    const oprands = /[A-Za-z0-9]/;
    const operators = /[-+%/*]/;
    for(var ch of postfix)
    {

        if(ch.match(oprands))
        {
            ch = parseFloat(map_array[ch]);
            stack.push(ch);
        }
        else if(ch.match(operators))
        {
            op1 = stack.pop();
            op2 = stack.pop();
            if(ch == '+')
                result = op2 + op1;
            else if(ch == '-')
                result = op2 - op1;
            else if(ch == '*')
                result = op2 * op1;      
            else if(ch == '/')
                result = op2 / op1;   
            else if(ch == '%')
                result = op2 % op1;
            stack.push(result);     
        }

    }
    return stack.pop();
}

document.addEventListener('keydown',function keyevents(event)
{
    if(event.key == '0' )
        document.getElementById('0').click();

    else if(event.key == '1' )
        document.getElementById('1').click();

    else if(event.key == '2' )
        document.getElementById('2').click();

    else if(event.key == '3' )
        document.getElementById('3').click();

    else if(event.key == '4' )
        document.getElementById('4').click();

    else if(event.key == '5' )
        document.getElementById('5').click();

    else if(event.key == '6' )
        document.getElementById('6').click();

    else if(event.key == '7' )
        document.getElementById('7').click();

    else if(event.key == '8' )
        document.getElementById('8').click();

    else if(event.key == '9' )
        document.getElementById('9').click();

    else if(event.key == '(' )
        document.getElementById('lp').click();

    else if(event.key == ')' )
        document.getElementById('rp').click();

    else if(event.key == '+' )
        document.getElementById('add-button').click();

    else if(event.key == '-' )
        document.getElementById('minus-button').click();

    else if(event.key == '*' )
        document.getElementById('*').click();

    else if(event.key == '/' )
        document.getElementById('/').click();

    else if(event.key == '%' )
        document.getElementById('%').click();

    else if(event.key == '=' || event.key == 'Enter')
        document.getElementById('=').click();

    else if(event.key == '.' )
        document.getElementById('.').click();

    else if(event.key == 'Backspace' )
        document.getElementById('del').click();

    else if(event.key == 'Delete' )
        document.getElementById('ac').click();

} 
);

