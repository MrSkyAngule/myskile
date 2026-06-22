stop:
	killall uwsgi

start:
	cd /var/www/testing/config/uwsgi && uwsgi --ini uwsgi.ini --daemonize /var/log/uwsgi_ois.log

restart:
	cd /var/www/testing/config/uwsgi && uwsgi --ini uwsgi.ini --daemonize /var/log/uwsgi_ois.log && sudo systemctl restart nginx

restart_ng:
	sudo nginx -t && sudo systemctl restart nginx
