<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Campus Safety Reporter</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
<link href="https://fonts.googleapis.com/css2?family=Pacifico&amp;display=swap" rel="stylesheet"/>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet"/>
<link href="https://ai-public.creatie.ai/gen_page/tailwind-custom-v2.css" rel="stylesheet"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.5.0/echarts.min.js"></script>
<script src="https://cdn.tailwindcss.com/3.4.5?plugins=forms@0.5.7,typography@0.5.13,aspect-ratio@0.4.2,container-queries@0.1.1"></script>
<script src="https://ai-public.creatie.ai/gen_page/tailwind-config.min.js" data-color="#000000" data-border-radius="small"></script>
</head>
<body class="bg-gray-50">
<div class="max-w-[375px] mx-auto min-h-screen pb-16 transition-all duration-300">
<header class="sticky top-0 z-50 bg-white shadow-sm">
<div class="flex items-center justify-between px-4 py-3">
<div class="font-pacifico text-xl text-custom"><span class="font-pacifico text-xl text-custom hover:scale-110 transition-transform duration-300 cursor-pointer">SafetyFirst</span></div>
<button class="p-2"><i class="fas fa-bars text-gray-600"></i></button>
</div>
</header>
<main class="px-4">
<section class="mt-4">
<div class="grid grid-cols-2 gap-4">
<div class="bg-white p-4 rounded-lg shadow-sm">
<p class="text-sm text-gray-500">Total Reports</p>
<p class="text-2xl font-semibold mt-1">247</p>
</div>
<div class="bg-white p-4 rounded-lg shadow-sm">
<p class="text-sm text-gray-500">Active Cases</p>
<p class="text-2xl font-semibold mt-1">12</p>
</div>
</div>
</section>
<section class="mt-6">
<div class="flex gap-4">
<button class="flex-1 bg-custom text-white py-3 !rounded-button flex items-center justify-center hover:bg-custom/80 transform hover:scale-105 transition-all duration-300 shadow-lg">
<i class="fas fa-exclamation-circle mr-2"></i>
Report Incident
</button>
<button class="flex-1 bg-red-500 text-white py-3 !rounded-button flex items-center justify-center hover:bg-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
<i class="fas fa-video mr-2"></i>
Live Stream
</button>
</div>
</section>
<section class="mt-6">
<div class="flex items-center justify-between mb-4">
<h2 class="text-lg font-semibold">Recent Reports</h2>
<a href="#" class="text-custom text-sm">View All</a>
</div>
<div class="space-y-4">
<div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1">
<div class="flex items-center justify-between">
<div class="flex items-center">
<div class="w-10 h-10 bg-custom/10 rounded-full flex items-center justify-center">
<i class="fas fa-bolt text-custom"></i>
</div>
<div class="ml-3">
<p class="font-medium">Electrical Issue</p>
<p class="text-sm text-gray-500">Building A, Floor 2</p>
</div>
</div>
<span class="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">Pending</span>
</div>
<p class="text-sm text-gray-600 mt-3">Flickering lights in classroom 204, potential electrical hazard.</p>
<p class="text-xs text-gray-400 mt-2">2 hours ago</p>
</div>
<div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1">
<div class="flex items-center justify-between">
<div class="flex items-center">
<div class="w-10 h-10 bg-custom/10 rounded-full flex items-center justify-center">
<i class="fas fa-lock text-custom"></i>
</div>
<div class="ml-3">
<p class="font-medium">Security Concern</p>
<p class="text-sm text-gray-500">Parking Lot C</p>
</div>
</div>
<span class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Resolved</span>
</div>
<p class="text-sm text-gray-600 mt-3">Suspicious activity near parked vehicles.</p>
<p class="text-xs text-gray-400 mt-2">5 hours ago</p>
</div>
</div>
</section>
<section class="mt-6">
<h2 class="text-lg font-semibold mb-4">Status Overview</h2>
<div id="statusChart" class="w-full h-[200px]"></div>
</section>
<section class="mt-6 mb-20">
<h2 class="text-lg font-semibold mb-4">Quick Stats</h2>
<div class="grid grid-cols-3 gap-4">
<div class="bg-white p-3 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow duration-300 transform hover:scale-105">
<p class="text-sm text-gray-500">This Week</p>
<p class="text-xl font-semibold mt-1">32</p>
</div>
<div class="bg-white p-3 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow duration-300 transform hover:scale-105">
<p class="text-sm text-gray-500">Response</p>
<p class="text-xl font-semibold mt-1">15m</p>
</div>
<div class="bg-white p-3 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow duration-300 transform hover:scale-105">
<p class="text-sm text-gray-500">Active</p>
<p class="text-xl font-semibold mt-1">3</p>
</div>
</div>
</section>
</main>
<nav class="fixed bottom-0 w-full bg-white border-t border-gray-200">
<div class="max-w-[375px] mx-auto grid grid-cols-4 gap-1">
<a href="#" class="flex flex-col items-center py-2 text-custom hover:bg-gray-100 transition-colors duration-300">
<i class="fas fa-home text-lg"></i>
<span class="text-xs mt-1">Home</span>
</a>
<a href="#" class="flex flex-col items-center py-2 text-gray-500 hover:text-custom hover:bg-gray-100 transition-all duration-300">
<i class="fas fa-plus-circle text-lg"></i>
<span class="text-xs mt-1">Report</span>
</a>
<a href="#" class="flex flex-col items-center py-2 text-gray-500 hover:text-custom hover:bg-gray-100 transition-all duration-300">
<i class="fas fa-history text-lg"></i>
<span class="text-xs mt-1">History</span>
</a>
<a href="#" class="flex flex-col items-center py-2 text-gray-500 hover:text-custom hover:bg-gray-100 transition-all duration-300">
<i class="fas fa-user text-lg"></i>
<span class="text-xs mt-1">Profile</span>
</a>
</div>
</nav>
</div>
<script>
const chart = echarts.init(document.getElementById('statusChart'));
const option = {
animation: false,
tooltip: {
trigger: 'item'
},
legend: {
bottom: '0',
left: 'center'
},
series: [
{
type: 'pie',
radius: ['40%', '70%'],
avoidLabelOverlap: false,
label: {
show: false,
position: 'center'
},
emphasis: {
label: {
show: true,
fontSize: '18',
fontWeight: 'bold'
}
},
labelLine: {
show: false
},
data: [
{ value: 12, name: 'Pending', itemStyle: { color: '#FCD34D' } },
{ value: 8, name: 'In Progress', itemStyle: { color: '#60A5FA' } },
{ value: 25, name: 'Resolved', itemStyle: { color: '#34D399' } }
]
}
]
};
chart.setOption(option);
window.addEventListener('resize', () => {
chart.resize();
});
</script>


</body></html>
