/*!
 * 框架名称：db.js
 * 框架作者：新生帝(JsonLei)
 * 框架描述：APICloud模块db封装
 */
window.$$db = null;

// 创建并连接数据库
function db_openDatabase(dbname, callback) {
	// 创建本地数据库,如果存在，直接打开
	$$db.openDatabase({
		name : dbname
	}, function(ret, err) {
		if (ret.status && ( typeof callback == "function")) {
			callback();
		} else {
			H.$toast(err);
		}
	});
}

// 关闭数据库
function db_closeDatabase(dbname, callback) {
	$$db.closeDatabase({
		name : dbname
	}, function(ret, err) {
		if (ret.status && ( typeof callback == "function")) {
			callback();
		} else {
			H.$toast(err);
		}
	});
}

// 执行sql语句(一般用于执行增删改）
function db_executeSql(dbname, sql, callback) {
	db_openDatabase(dbname, function() {
		$$db.executeSql({
			name : dbname,
			sql : sql
		}, function(ret, err) {
			if (ret.status && ( typeof callback == "function")) {
				callback();
			} else {
				H.$toast(err);
			}
		});
	});
}

// 执行查询操作
function db_selectSql(dbname, sql, callback) {
	db_openDatabase(dbname, function() {
		$$db.selectSql({
			name : dbname,
			sql : sql
		}, function(ret, err) {
			if (ret.status && ( typeof callback == "function")) {
				var data = ret.data;
				callback(data);
			} else {
				H.$toast(err);
			}
		});
	});
}

// 执行事务
// operation:
//          begin //开始事务
//          commit //提交事务
//          rollback //回滚操作
function db_transaction(dbname, operation) {
	$$db.transaction({
		name : dbname,
		operation : operation
	}, function(ret, err) {
		if (ret.status && ( typeof callback == "function")) {
			var data = ret.data;
			callback(data);
		} else {
			H.$toast(err);
		}
	});
}