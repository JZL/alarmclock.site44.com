(function(b){function f(b){b=b.toString();return Array(3-b.length).join("0")+b}function g(b){return b.getFullYear()+"-"+f(b.getMonth()+1)+"-"+f(b.getDate())}var j="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),p="January February March April May June July August September October November December".split(" ");b.drcal=function(){var f=[],a=b('<table class="calendar"><thead><tr><th colspan="7"><button class="prev"></button><span class="monthyear"></span><button class="next"></button></th></tr></thead><tbody></tbody></table>');
b("<tr>"+b.map(j,function(a){return"<th>"+a+"</th>"}).join("")+"</tr>").appendTo(a.find("thead"));a.year=function(){return a.attr("year")?parseInt(a.attr("year"),10):null};a.month=function(){return a.attr("month")?parseInt(a.attr("month"),10):null};a.findCell=function(b){return a.find('[date="'+g(b)+'"]')};a.changeMonth=function(h){var d=new Date(h.getFullYear(),h.getMonth(),1),d=new Date(d.getTime()-864E5*d.getDay()),e=new Date,j=new Date(e.getFullYear(),e.getMonth(),e.getDate()),e=h.getFullYear(),
k=h.getMonth();b("tbody > tr",a).detach();do{var c=f[g(d)],l=!1;if(!c){for(var l=!0,c=d,m=b("<tr></tr>"),n=0;7>n;n++)b('<td date="'+g(c)+'" year="'+c.getFullYear()+'" month="'+(c.getMonth()+1)+'" day="'+c.getDate()+'"></td>').appendTo(m),c=new Date(c.getTime()+864E5);c=m;f[g(d)]=c}b("td",c).each(function(a,c){b(c).removeClass("today").removeClass("extra");b(c).attr("date")===g(j)&&b(c).addClass("today");b(c).attr("month")!=k+1&&b(c).addClass("extra")});b("tbody",a).append(c);l&&a.trigger("drcal.weekRender",
[c]);d=new Date(d.getTime()+6048E5)}while(d.getMonth()===h.getMonth());a.attr("year",e);a.attr("month",k+1);a.find(".monthyear").empty().append(p[k]+" "+e);a.trigger("drcal.monthChange",[])};a.find("button.prev").click(function(){a.changeMonth(new Date(a.year()-(1===a.month()?1:0),1===a.month()?11:a.month()-2,1))});a.find("button.next").click(function(){a.changeMonth(new Date(a.year()+(12===a.month()?1:0),12===a.month()?0:a.month(),1))});return a}})(jQuery);