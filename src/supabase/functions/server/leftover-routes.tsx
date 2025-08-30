import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';

const leftoverRoutes = new Hono();

// 남은 음식 목록 가져오기
leftoverRoutes.get('/leftovers', async (c) => {
  try {
    const kvResults = await kv.getByPrefix('leftover:');
    const foods = kvResults.map(item => ({
      ...item.value,
      id: item.key.replace('leftover:', '')
    }));
    console.log('Retrieved leftover foods:', foods);
    return c.json(foods);
  } catch (error) {
    console.log(`Error fetching leftovers: ${error}`);
    return c.json({ error: 'Failed to fetch leftovers' }, 500);
  }
});

// 새 음식 추가
leftoverRoutes.post('/leftovers', async (c) => {
  try {
    const { name, level, description } = await c.req.json();
    
    if (!name) {
      return c.json({ error: 'Name is required' }, 400);
    }

    const id = Date.now().toString();
    const food = {
      id,
      name,
      level: level || 50,
      description: description || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`leftover:${id}`, food);
    return c.json(food);
  } catch (error) {
    console.log(`Error creating leftover food: ${error}`);
    return c.json({ error: 'Failed to create leftover food' }, 500);
  }
});

// 음식 레벨 업데이트
leftoverRoutes.put('/leftovers/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const { level, name, description } = await c.req.json();
    
    const existing = await kv.get(`leftover:${id}`);
    if (!existing) {
      return c.json({ error: 'Food not found' }, 404);
    }

    const updated = {
      ...existing,
      ...(level !== undefined && { level }),
      ...(name && { name }),
      ...(description !== undefined && { description }),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`leftover:${id}`, updated);
    return c.json(updated);
  } catch (error) {
    console.log(`Error updating leftover food: ${error}`);
    return c.json({ error: 'Failed to update leftover food' }, 500);
  }
});

// 음식 삭제
leftoverRoutes.delete('/leftovers/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`leftover:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error deleting leftover food: ${error}`);
    return c.json({ error: 'Failed to delete leftover food' }, 500);
  }
});

export { leftoverRoutes };