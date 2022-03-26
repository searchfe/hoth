module.exports = {
    apps: [
        {
            name: 'nodeserver',
            script: './node_modules/@hoth/cli/dist/start.js',
            args: ['-a', '0.0.0.0'],
            cwd: './',
            exec_mode: 'cluster',
            instances: 6,
            wait_ready: true,
            listen_timeout: 20000,
            min_uptime: '30s',
            max_restarts: 5,
            exp_backoff_restart_delay: 5000,
            watch: false,
            ignore_watch: [],
            out_file: './log/pm2/node.stdout.log',
            error_file: './log/pm2/node.stderr.log',
            merge_logs: true,
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
            env: {
                'NODE_ENV': 'production',
                'NODE_CONFIG_STRICT_MODE': '0'
            },
            env_development: {
                'NODE_ENV': 'development',
                'NODE_CONFIG_STRICT_MODE': '0'
            },
            env_production: {
                'NODE_ENV': 'production',
                'NODE_CONFIG_STRICT_MODE': '0'
            },
            node_args: [
                '--expose-gc',
                '--preserve-symlinks'
            ]
        }
    ]
};
