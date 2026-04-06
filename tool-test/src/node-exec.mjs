import { spawn } from 'node:child_process';  // 创建子进程执行系统命令

// const command = 'ls -la';  // 存储要执行的命令字符串（实际调用前需拆分）
const command = 'echo -e "n\nn" | pnpm create vite react-todo-app --template react-ts';
const cwd = process.cwd();  // 获取当前工作目录，用于控制子进程的执行路径

// 解析命令和参数
const [cmd, ...args] = command.split(' ');

const child = spawn(cmd, args, {
  cwd,  // 设置子进程的工作目录
  stdio: 'inherit',  // 实时输出到控制台，继承父进程的标准输入输出
  shell: true  // 使用 shell 执行命令，允许使用管道符等功能
});

let errorMsg = '';

child.on('error', (error) => {
  errorMsg = error.message;
});

child.on('close', (code) => {
  if (code === 0) {
    process.exit(0);
  } else {
    if(errorMsg) {
      console.error(`错误: ${errorMsg}`);
    }
    process.exit(code || 1);
  }
});