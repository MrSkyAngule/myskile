stop:
	killall uwsgi

start:
	cd /var/www/myskile/config/uwsgi && uwsgi --ini uwsgi.ini --daemonize /var/log/uwsgi_ois.log

restart:
	cd /var/www/myskile/config/uwsgi && uwsgi --ini uwsgi.ini --daemonize /var/log/uwsgi_ois.log && sudo systemctl restart nginx

restart_ng:
	sudo nginx -t && sudo systemctl restart nginx

start_env:
	cd /var/www/myskile && source env/bin/activate